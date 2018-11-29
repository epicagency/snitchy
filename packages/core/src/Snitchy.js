/* eslint-disable */
import error from 'combine-errors';
import parser from '@snitchy/parser'
import {
  kebabcase,
  camelcase,
  lcfirst,
} from '@snitchy/utils'
import rules from './rules';
import {
  validate,
  qs,
} from './utils';

let instance;

export class Snitchy {
  #debug = false;
  #options;
  #parser;
  #rules;
  #variables;

  static start(options) {
    instance = instance || new Snitchy(options);

    return instance;
  }

  static destroy() {
    return instance = null;
  }

  constructor(options = {
    pageAttribute: 'data-snitchy-page',
  }) {
    this.#options = options;
    // Dev: quid if rules to add?
    this.#parser = parser.init(rules);
    this.#rules = rules;
  }

  set debug(status) {
    this.#debug = status;
  }

  get debug() {
    return this.#debug;
  }

  get variables() {
    return this.#variables;
  }

  /**
   * Load variables data
   *
   * @param {object} variables to load
   * @returns {undefined}
   * @memberof Snitchy
   */
  load(variables) {
    if (!variables) {
      this._displayErrors(`Invalid parameter "variables" [${variables}] [@snitchy/core]`);
    }

    Object.keys(variables).forEach(key => {
      // No additional properties
      if (!key.match(/pages|events/)) {
        this._displayErrors(`Invalid option "${key}" [no additional data] [@snitchy/core]`);
      }
      // Should be an object
      if (key.match(/pages|events/) && typeof variables[key] !== 'object') {
        this._displayErrors(`Invalid option "${key}" [should be an object] [@snitchy/core]`);
      }
    });

    try {
      this.#variables = validate(variables);
    } catch (error) {
      /* istanbul ignore next */
      this._displayErrors('Invalid variables data ! [@snitchy/core]', error);
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
    try {
      this._hasVariables();
    } catch (error) {
      return null;
    }

    if (typeof layer !== 'string' && !Array.isArray(layer)) {
      this._displayWarnings('Expected argument "layer" to be of type `string` or `array` [@snitchy/core]');

      return null;
    }

    // Get array of layers
    const layers = Array.isArray(layer) ? layer : [layer];

    this.values = values;
    this.scope = scope;

    // Get the current namespace
    let namespace;

    if (ns) {
      if (typeof ns !== 'string') {
        this._displayWarnings('Expected argument "name" to be of type `string` [@snitchy/core]');

        return null;
      }

      namespace = ns;
    } else if (qs(`[${this.#options.pageAttribute}]`, document.documentElement)) {
      // eslint-disable-next-line prefer-destructuring
      namespace = qs(`[${this.#options.pageAttribute}]`, document.documentElement).getAttribute(this.#options.pageAttribute);
    } else {
      namespace = null;
    }

    // Prepare data
    const data = {};

    // Get global (all) and custom (namespace) data
    layers.forEach(layer => {
      const global = this.variables.pages.all && this.variables.pages.all[layer] ?
        this._getData(this.variables.pages.all[layer]) :
        {};
      const custom = this.variables.pages[namespace] && this.variables.pages[namespace][layer] ?
        this._getData(this.variables.pages[namespace][layer]) :
        {};

      data[layer] = {
        ...global,
        ...custom,
      };

      if (Object.keys(data[layer]).length === 0) {
        this._displayWarnings(`No data found for "${layer}" layer on "${namespace || 'all'}" page [@snitchy/core]`);

        delete data[layer];
      } else {
        // Check for event…
        // If no data layer, push with `.push({ event: 'page-load`, page: { … }})`
        // If event, push with `.push({ event: 'event-name`, page: { … }})`
        // Else, set dataLayer ` = [{ page: { … }}]`
        const hasEvent = data[layer].event;

        if (this._hasDataLayer() || hasEvent) {
          if (hasEvent) {
            data.event = data[layer].event;
            delete data[layer].event;
          } else {
            data.event = 'page-load';
          }
        }
      }
    });

    if (Object.keys(data).length === 0) {
      this._displayWarnings(`No data found on "${namespace || 'all'}" page [@snitchy/core]`);

      return null;
    }

    if (data.event) {
      this._push(data);
    } else {
      this._set(data)
    }

    return data;
  }

  /**
   * Push "event" analytics.
   *
   * @param {string} name component name
   * @param {object} values optional values from "caller"
   * @param {*} scope optional scope from "caller"
   * @param {string} [trigger = false] optional trigger from "caller"
   * @returns {undefined}
   * @memberof Snitchy
   */
  event(name, values, scope, trigger) {
    try {
      this._hasVariables();
    } catch (error) {
      return null;
    }

    if (typeof name !== 'string') {
      this._displayErrors('Expected argument "name" to be of type `string` [@snitchy/core]');
    }

    this.values = values;
    this.scope = scope;

    const layers = this.variables.events[name];

    if (!layers) {
      return null;
    }

    const pushed = [];

    Object.keys(layers)
      // Filter if optional trigger
      .filter(layer => trigger ? layers[layer].trigger === trigger : true)
      .forEach(layer => {
        // Prepare data
        const layerData = layers[layer];
        const data = this._getData(layerData);

        delete data.trigger;

        pushed.push(data);
        this._push(data);
      });

    return pushed;
  }

  _set(data) {
    if (this.debug) {
      this._logData(data, 'set');
    } else {
      window.dataLayer = [data];
    }
  }

  /**
   * Push data to dataLayer
   *
   * @param {object} data data to push
   * @returns {undefined}
   * @memberof Snitchy
   */
  _push(data) {
    if (this.debug) {
      this._logData(data, 'push');
    } else {
      try {
        dataLayer.push(data);
      } catch (err) {
        this._displayErrors('No "dataLayer" found. Check if GTM is correctly configured [@snitchy/core]', err);
      }
    }

    return data;
  }


  _hasVariables() {
    if (this.variables) {
      return true;
    } else {
      this._displayErrors('No "variables" found. Are they loaded? [@snitchy/core]');
    }
  }

  _hasDataLayer() {
    return window.dataLayer !== undefined;
  }

  /**
   * Get data from layer
   *
   * @param {object} layerData layer data
   * @returns {object} data
   * @memberof Snitchy
   */
  _getData(layerData) {
    if (!layerData) {
      return {};
    }

    // Get values
    return Object.keys(layerData).reduce((data, k) => {
      data[k] = layerData[k].match(/^\$/) ? this._getValue(layerData[k]) : layerData[k];

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
  _getValue(str) {
    try {
      // Get token from parser
      const token = this.#parser.parse(str);

      // DEV (fixed with throwed errors?)
      // if (token === null) {
      //   this._displayWarnings(`Invalid value, no matching results for '${str}' [@snitchy/parser]`);

      //   return null;
      // }
      const { param, value: rawValue, extra, element, name, filters, defaults, optional } = token;

      // Main rule comes from 'param'
      const rule = this.#rules[param];
      const value = rule.format ? rule.format(rawValue) : rawValue;
      const getters = rule.getters(value, extra);

      let root = null;
      let data = null;

      if (element) {
        // Get 'root()' of rule 'element'
        root = rules[element].root(this, name);
      } else {
        // For 'param', it's optional
        if (rule.root) {
          root = rule.root(this, name);
        } else {
          root = document.documentElement.querySelector(`[${value}]`) || document.documentElement;
        }
      }

      data = this._processValue(root, getters);

      if (filters) {
        filters.forEach(filter => {
          /* istanbul ignore else */
          if (filter.match(/lowercase/)) {
            data = data.toLowerCase();
          }

          /* istanbul ignore else */
          if (filter.match(/uppercase/)) {
            data = data.toUpperCase();
          }

          /* istanbul ignore else */
          if (filter.match(/^.+\(.+\)$/)) {
            const match = filter.match(/^(.+)\((?:'|")(.+)(?:'|")\)$/);

            if (match === null) {
              this._displayWarnings(`Invalid filter value for '${filter}' [@snitchy/core]`);
            } else {
              const [, method, arg] = match;

              data = data[method](arg);
            }
          }
        });
      }

      if(!data && defaults) {
        data = defaults;
      }

      if (!data && !optional) {
        this._displayWarnings(`No value found for '${str}', try 'defaults' or optional parameter [@snitchy/core]`);
      }

      return data;
    } catch (error) {
      this._displayWarnings(`Invalid value, no matching results for '${str}' [@snitchy/core]`);
      this._displayWarnings(error);

      return null;
    }
  }

  _processValue(root, getters) {
    return getters.reduce((acc, getter) => getter.type === 'property' ?
        acc[getter.name] :
        acc[getter.name](...Array.isArray(getter.value) ? getter.value : [getter.value]), root);
  }

  _logData(data, mode) {
    console.info(`👀 ${mode.toUpperCase()}!`, data);
    /* istanbul ignore next */
    if (console.table) {
      console.table(data);
    }
  }

  /**
   * Display warnings.
   *
   * @static
   * @param {string} message custom message
   * @returns {undefined}
   */
  _displayWarnings(message) {
    console.warn(`👀 ${message}\nFor more informations, see https://github.com/epicagency/snitchy`);
  }

  /**
   * Display errors.
   *
   * @param {string | Error | array} fail error(s) or message(s)
   * @returns {undefined}
   */
  _displayErrors(fail) {
    // TODO: test / improve multiples errors…
    /* istanbul ignore next */
    const fails = Array.isArray(fail) ? fail : [fail];
    const errors = [];

    fails.forEach(fail => {
      // TODO: test / improve multiples errors…
      /* istanbul ignore else */
      if (typeof fail === 'string') {
        errors.push(new Error(`👀 ${fail}\nFor more informations, see https://github.com/epicagency/snitchy`));
      } else {
        errors.push(fail);
      }
    });

    throw error(errors);
  }
}

export default Snitchy.start();
