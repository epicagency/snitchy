/* global dataLayer */
import trim from 'trim';
import queryString from 'query-string';
import {
  validate,
  qs,
  kebabCase,
  displayErrors,
  displayWarnings,
} from './utils';

let instance;

export class Snitchy {
  static start() {
    instance = instance || new Snitchy();

    return instance;
  }

  constructor() {
    this._debug = false;
    this._prefixes = {
      attr: {
        fn: key => {
          const htmlKey = kebabCase(key);

          return document.documentElement.getAttribute(htmlKey) ||
            qs(`[${htmlKey}]`, document.documentElement).getAttribute(htmlKey);
        },
        error: key => `Unable to find "${kebabCase(key)}" attribute.`,
      },
      tag: {
        fn: key => trim(qs(key, document.documentElement).textContent),
        error: key => `Unable to find "${key}" element.`,
      },
      this: {
        fn: key => this.scope[key],
        error: key => `Unable to get "this.${key}". No scope found.`,
      },
      url: {
        fn: key => {
          const { location } = window;

          if (key) {
            const [param, value] = Snitchy.parseValue(key);
            const parsed = queryString.parse(location.search);

            if (param !== 'param' || !value || !parsed[value]) {
              throw new Error();
            }

            return parsed[value];
          }

          return window.location.href;
        },
        error: key => {
          const [, value] = Snitchy.parseValue(key);

          return `No keyword "param" or "${value}" found in "window.location.search"`;
        },
      },
      val: {
        fn: (key, values) => values[key],
        error: key => `Unable to get "values.${key}". No values found.`,
      },
    };
  }

  set debug(status) {
    this._debug = status;
  }

  get debug() {
    return this._debug;
  }

  get prefixes() {
    return this._prefixes;
  }

  addPrefix(name, options) {
    if (this.prefixes[name]) {
      displayWarnings(`Prefix "${name} already exists! You can remove it…`);

      return;
    }

    Object.keys(options).forEach(key => {
      // No additional properties
      if (!key.match(/fn|error/)) {
        displayErrors(`Invalid option "${key}" [no additional data]`);
      }
      // Should be a function
      if (key.match(/fn|error/) && typeof options[key] !== 'function') {
        displayErrors(`Invalid option "${key}" [should be a function]`);
      }
    });

    this._prefixes[name] = options;
  }

  removePrefix(name) {
    if (this.prefixes[name]) {
      delete this._prefixes[name];

      return;
    }

    displayWarnings(`Prefix "${name} unknown!`);
  }

  get variables() {
    return this._variables || this.isLoaded();
  }

  /**
   * Load variables data
   *
   * @param {object} variables to load
   * @returns {undefined}
   * @memberof Snitchy
   */
  load(variables) {
    Object.keys(variables).forEach(key => {
      // No additional properties
      if (!key.match(/pages|components/)) {
        displayErrors(`Invalid option "${key}" [no additional data]`);
      }
      // Should be an object
      if (key.match(/pages|components/) && typeof variables[key] !== 'object') {
        displayErrors(`Invalid option "${key}" [should be an object]`);
      }
    });

    try {
      validate(variables);
      this._variables = variables;
    } catch (error) {
      displayErrors('Invalid variables data !', error);
    }
  }

  /**
   * Check if variables are there
   *
   * @param {string} [from='variables'] name of the method trying to use this.variables
   * @returns {boolean} loaded or not…
   * @memberof Snitchy
   */
  isLoaded(from = 'variables') { // eslint-disable-line consistent-return
    try {
      return this._variables;
    } catch (err) {
      displayErrors(`No "variables" found [snitchy.${from}]. Are they loaded?`, err);
    }
  }

  /**
   * Push "page" analytics.
   *
   * @param {string | array} layer main layer(s)
   * @param {object} values optional values from "caller"
   * @param {*} scope optional scope from "caller"
   * @param {string} ns optional namespace for override
   * @returns {null | object} pushed data
   * @memberof Snitchy
   */
  page(layer, values, scope, ns) {
    if (!this.isLoaded('page()')) {
      return null;
    }

    if (typeof layer !== 'string' && !Array.isArray(layer)) {
      displayErrors('Expected argument "layer" to be of type `string` or `array`');
    }

    // Get array of layers
    const layers = Array.isArray(layer) ? layer : [layer];

    this.values = values;
    this.scope = scope;

    // Get the current namespace
    let namespace;

    if (ns) {
      namespace = ns;
    } else if (qs('[data-namespace]')) {
      namespace = qs('[data-namespace]').dataset.namespace; // eslint-disable-line prefer-destructuring
    } else {
      namespace = null;
    }

    // Prepare data
    const data = {};

    // Get global (all) and custom (namespace) data
    layers.forEach(layer => {
      const global = this.variables.pages.all && this.variables.pages.all[layer] ?
        this.getData(this.variables.pages.all[layer]) :
        {};
      const custom = this.variables.pages[namespace] && this.variables.pages[namespace][layer] ?
        this.getData(this.variables.pages[namespace][layer]) :
        {};

      data[layer] = {
        ...global,
        ...custom,
      };

      if (Object.keys(data[layer]).length === 0) {
        displayWarnings(`No data found for "${layer}" layer on "${namespace || 'all'}" page.`);

        delete data[layer];
      }
    });

    // Do not push empty data…
    if (Object.keys(data).length === 0) {
      return null;
    }

    return this.push(data);
  }

  /**
   * Push "component" analytics.
   *
   * @param {string} slug component slug
   * @param {object} values optional values from "caller"
   * @param {*} scope optional scope from "caller"
   * @param {string} [trigger = false] optional trigger from "caller"
   * @returns {undefined}
   * @memberof Snitchy
   */
  component(slug, values, scope, trigger) {
    if (!this.isLoaded('component()')) {
      return null;
    }

    if (typeof slug !== 'string') {
      displayErrors('Expected argument "slug" to be of type `string`');
    }

    this.values = values;
    this.scope = scope;

    const variables = this.variables.components[slug];

    if (!variables) {
      return null;
    }

    const pushed = [];

    Object.keys(variables)
      // Filter if optional trigger
      .filter(description => trigger ? variables[description].trigger === trigger : true)
      .forEach(description => {
        // Prepare data
        const variable = variables[description];
        const data = this.getData(variable);

        delete data.trigger;

        pushed.push(data);
        this.push(data);
      });

    return pushed;
  }

  /**
   * Push data to dataLayer
   *
   * @param {object} data data to push
   * @returns {undefined}
   * @memberof Snitchy
   */
  push(data) {
    if (this.debug) {
      console.info('📈 PUSH!', data);
      console.table(data);
    } else {
      try {
        dataLayer.push(data);
      } catch (err) {
        displayErrors('No "dataLayer" found. Check if GTM is correctly configured.', err);
      }
    }

    return data;
  }


  /**
   * Get data from variables
   *
   * @param {object} obj variables
   * @returns {object} data
   * @memberof Snitchy
   */
  getData(obj) {
    if (!obj) {
      return {};
    }

    // Get values
    return Object.keys(obj).reduce((data, k) => {
      data[k] = Snitchy.isDynamicValue(obj[k]) ? this.getValue(obj[k]) : obj[k];

      return data;
    }, {});
  }

  /**
   * Get a dynamic value
   *
   * @param {string} value dynamic string to convert in real value
   * @returns {* | undefined} calculated value
   * @memberof Snitchy
   */
  getValue(value) {
    let data;
    const [type, key] = Snitchy.parseValue(value);

    try {
      const hasPrefix = this.prefixes[type].fn; // eslint-disable-line no-unused-vars
    } catch (err) {
      displayErrors(`Unable to find valid "${type}" prefix.`, err);
    }

    // Try "fn" or throw "error"
    try {
      data = this.prefixes[type].fn(key, this.values, this.scope);
    } catch (err) {
      if (this.prefixes[type].error) {
        // Allow "fn" to throw "custom" error…
        displayErrors([this.prefixes[type].error(key), err]);
      } else {
        displayErrors(`Something went wrong with "${key}" (No error message for "${type}").`, err);
      }
    }

    // "fn" did not return error but undefined
    if (data === undefined) {
      let desc = 'undefined';

      if (type === 'this') {
        desc = 'property';
      }
      if (type === 'val') {
        desc = 'value';
      }
      displayErrors(`Unable to find "${kebabCase(key)}" ${desc}.`);
    }

    return data;
  }

  /**
   * Check if a value is "dynamic" and should be parsed.
   * Dynamic values start with a '$'.
   *
   * @static
   * @param {string} value value to check
   * @returns {boolean} is dynamic
   * @memberof Snitchy
   */
  static isDynamicValue(value) {
    return value.match(/^\$/);
  }

  /**
   * Parse and format a dynamic value.
   *
   * @static
   * @param {string} value dynamic value $typeKeyToFindValue
   * @returns {[string, string]} type and key (format: keyToFindValue)
   * @memberof Snitchy
   */
  static parseValue(value) {
    return value
      .split(/(?=[A-Z])/)
      .reduce((acc, cur, i) => {
        if (i === 0) {
          acc.push(cur.replace('$', ''));
        } else if (i === 1) {
          acc.push(cur.toLowerCase());
        } else {
          acc[1] += cur;
        }

        return acc;
      }, []);
  }
}

export default Snitchy.start();
