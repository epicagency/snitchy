import parser from '@snitchy/parser';
import error from 'combine-errors';
import mergeWith from 'lodash/mergeWith';
import {
  isEmpty,
  qs,
// DEV
//   kebabcase,
//   camelcase,
//   lcfirst,
} from '@snitchy/utils';
import rules from './rules';
import {
  validate,
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
    instance = null;

    return instance;
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
      Snitchy._displayErrors(`Invalid parameter "variables" [${variables}] [@snitchy/core]`);
    }

    Object.keys(variables).forEach(key => {
      // No additional properties
      if (!key.match(/pages|events/)) {
        Snitchy._displayErrors(`Invalid option "${key}" [no additional data] [@snitchy/core]`);
      }
      // Should be an object
      if (key.match(/pages|events/) && typeof variables[key] !== 'object') {
        Snitchy._displayErrors(`Invalid option "${key}" [should be an object] [@snitchy/core]`);
      }
    });

    try {
      this.#variables = validate(variables);
    } catch (error) {
      /* istanbul ignore next */
      Snitchy._displayErrors('Invalid variables data ! [@snitchy/core]', error);
    }
  }

  /**
   * Push "page" analytics.
   *
   * @param {string} [name = 'all'] page "name" (all or all + specific)
   * @param {string | array} [layer = 'page'] main layer(s)
   * @param {string | array} [event = 'page-load'] layer event(s)
   * @param {object} [scope = undefined] optional scope from "caller"
   * @param {object} [values = undefined] optional values from "caller"
   * @returns {null | array} pushed data
   * @memberof Snitchy
   */
  page(name = 'all', {
    layer = 'page',
    event = 'page-load',
    scope = undefined,
    values = undefined,
  } = {}) {
    return this.prepare('page', {
      name,
      layer,
      event,
      scope,
      values,
      trigger: false,
    });
  }

  /**
   * Push "event" analytics.
   *
   * @param {string} name component "name"
   * @param {string | array} [layer = 'default'] layer(s)
   * @param {string | array} [event = undefined] event(s)
   * @param {object} [scope = undefined] optional scope from "caller"
   * @param {object} [values = undefined] optional values from "caller"
   * @param {string} [trigger = false] optional trigger from "caller"
   * @returns {null | array} pushed data
   * @memberof Snitchy
   */
  event(name, {
    layer = undefined,
    event = undefined,
    scope = undefined,
    values = undefined,
    trigger = false,
  } = {}) {
    return this.prepare('event', {
      name,
      layer,
      event,
      scope,
      values,
      trigger,
    });
  }

  /**
  * Push "event" analytics.
  *
   * @param {string} type page or event
   * @param {object} args args from `page()` or `event()`
   * @param {string} args.name component "name"
   * @param {string | array} args.layer layer(s)
   * @param {string | array} args.event event(s)
   * @param {object} args.scope optional scope from "caller"
   * @param {object} args.values optional values from "caller"
   * @param {string} args.trigger optional trigger from "caller"
   * @returns {null | array} pushed data
   * @memberof Snitchy
   */
  prepare(type, args) {
    const { name, layer, event, scope, values, trigger } = args;

    try {
      this._hasVariables();
    } catch (error) {
      return null;
    }

    // Needed later for layer push validation
    const hasLayer = layer !== undefined;
    const hasEvent = event !== undefined;
    const hasTrigger = trigger !== false;

    // Some "type" checks
    if (typeof name !== 'string') {
      Snitchy._displayErrors('Expected argument "name" to be of type `string` [@snitchy/core]');
    }

    if (hasLayer && typeof layer !== 'string' && !Array.isArray(layer)) {
      Snitchy._displayWarnings('Expected argument "layer" to be of type `string` or `array` [@snitchy/core]');

      return null;
    }

    if (hasEvent && typeof event !== 'string' && !Array.isArray(event)) {
      Snitchy._displayWarnings('Expected argument "event" to be of type `string` or `array` [@snitchy/core]');

      return null;
    }

    if (hasTrigger && typeof trigger !== 'string') {
      Snitchy._displayWarnings('Expected argument "trigger" to be of type `string` [@snitchy/core]');

      return null;
    }

    // Layers from the "name", by slug
    let layersBySlug;

    // Page
    // We can have "all" name + specific name
    // In this case, data properties are merged
    if (type === 'page') {
      const names = [];

      // If "all" property, push it
      if (this.variables.pages.all) {
        names.push('all');
      }

      if (name === 'all') {
        // Auto detect "name"
        if (qs(`[${this.#options.pageAttribute}]`, document.documentElement)) {
          // eslint-disable-next-line prefer-destructuring
          names.push(qs(`[${this.#options.pageAttribute}]`, document.documentElement)
            .getAttribute(this.#options.pageAttribute));
        }
      } else {
        names.push(name);
      }

      if (names.length === 1) {
        // If only 1 "name", get layers by slug
        layersBySlug = this.variables.pages[names[0]];
      } else {
        // If "all" + "name", merge "name" with "all"
        // We will store all existing and unique layer slugs for merge strategy
        // Some layers can exist on "all" and/or "name"
        const mergedLayerSlugs = new Set();

        names.forEach(name => {
          /* istanbul ignore else */
          if (this.variables.pages[name]) {
            Object.keys(this.variables.pages[name]).forEach(layerSlug => {
              mergedLayerSlugs.add(layerSlug);
            });
          }
        });

        layersBySlug = {};

        mergedLayerSlugs.forEach(layerSlug => {
          layersBySlug[layerSlug] = mergeWith(
            this.variables.pages[names[0]][layerSlug], // "all"
            this.variables.pages[names[1]][layerSlug] // "name"
          );
        });
      }
    } else {
      layersBySlug = this.variables.events[name];
    }

    // If no available layers, get out
    if (!layersBySlug || isEmpty(layersBySlug)) {
      return null;
    }

    // Format "mixed" params (string vs array)
    const layers = Array.isArray(layer) ? layer : [layer];
    const events = Array.isArray(event) ? event : [event];

    // Store "values" and "scope"
    this.values = values;
    this.scope = scope;

    // Get slugs
    // If no "layer" param, use all current slugs
    const layerSlugs = hasLayer ?
      layers :
      Object.keys(layersBySlug);
    // If no "event" param, use all events based on current slugs
    const eventSlugs = hasEvent ?
      events :
      layerSlugs.reduce((acc, cur) => acc.concat(layersBySlug[cur].map(item => item.event)), []);

    // Prepare pushes
    const pushes = [];


    Object.keys(layersBySlug).forEach(layerSlug => {
      // Check if valid layer slug
      if (layerSlugs.includes(layerSlug)) {
        // Loop on remaining layers
        layersBySlug[layerSlug].forEach(layer => {
          // Check if valid event slug
          if (eventSlugs.includes(layer.event)) {
            // No trigger or, if trigger, it should match
            /* istanbul ignore else */
            if (!hasTrigger || (hasTrigger && layer.data.trigger === trigger)) {
              if (hasTrigger) {
                delete layer.data.trigger;
              }
              // Get the data
              const data = this._getData(layer.data);

              // Add to pushes
              if (type === 'page') {
                pushes.push({
                  [layerSlug]: data,
                  event: layer.event,
                });
              } else {
                pushes.push({
                  ...data,
                  event: layer.event,
                });
              }
            }
          }
        });
      }
    });

    // DEV
    // Never happen?
    // if (pushes.length === 0) {
    //   Snitchy._displayWarnings(`No data found on "${name}" ${type} [@snitchy/core]`);

    //   return null;
    // }

    pushes.forEach(push => {
      this.push(push, type);
    });

    return pushes;
  }

  /**
   * Push data to dataLayer
   *
   * @param {object} data data to push
   * @param {string} [type = 'push'] or 'page' or 'event'
   * @returns {undefined}
   * @memberof Snitchy
   */
  push(data, type = 'push') {
    if (this.debug) {
      Snitchy._logData(data, type);
    } else {
      try {
        window.dataLayer.push(data);
      } catch (err) {
        Snitchy._displayErrors('No "dataLayer" found. Check if GTM is correctly configured [@snitchy/core]', err);
      }
    }
  }

  // Private methods

  /**
   * Check if variables are loaded and available
   *
   * @returns {boolean} if has variables or not
   * @memberof Snitchy
   */
  // eslint-disable-next-line consistent-return
  _hasVariables() {
    if (this.variables) {
      return true;
    }

    Snitchy._displayErrors('No "variables" found. Are they loaded? [@snitchy/core]');
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

    // Return static value or get dynamic value
    return Object.keys(layerData).reduce((data, k) => {
      data[k] = layerData[k].match(/^\$/) ? this._getValue(layerData[k]) : layerData[k];

      return data;
    }, {});
  }

  /**
   * Get a dynamic value
   *
   * @param {string} str dynamic string to convert in real value
   * @returns {* | undefined} calculated value
   * @memberof Snitchy
   */
  _getValue(str) {
    try {
      // Get token from parser
      const token = this.#parser.parse(str);

      // DEV (fixed with throwed errors?)
      // if (token === null) {
      //   Snitchy._displayWarnings(`Invalid value, no matching results for '${str}' [@snitchy/parser]`);

      //   return null;
      // }
      const { param, value: rawValue, extra, element, name, filters, defaults, optional } = token;

      // Main rule comes from 'param'
      const rule = this.#rules[param];
      // Apply optional formating
      const value = rule.format ? rule.format(rawValue) : rawValue;
      // Get the "getters" (properties and/or methods)
      const getters = rule.getters(value, extra);

      // Root is the element on which we will apply the getters
      let root = null;

      if (element) {
        // Get 'root()' of rule 'element'
        root = rules[element].root(this, name);
      } else if (rule.root) {
        // For 'param', it's optional
        root = rule.root(this, name);
      } else {
        root = document.documentElement.querySelector(`[${value}]`) || document.documentElement;
      }

      // Now let's have some data for pushing
      let data = null;

      data = Snitchy._processValue(root, getters);

      // Post-processing through filters
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
              Snitchy._displayWarnings(`Invalid filter value for '${filter}' [@snitchy/core]`);
            } else {
              const [, method, arg] = match;

              data = data[method](arg);
            }
          }
        });
      }

      // No data but defaults
      if (!data && defaults) {
        data = defaults;
      }

      // No data but not optional
      if (!data && !optional) {
        Snitchy._displayWarnings(`No value found for '${str}', try 'defaults' or optional parameter [@snitchy/core]`);
      }

      return data;
    } catch (error) {
      // Something went wrong
      Snitchy._displayWarnings(`Invalid value, no matching results for '${str}' [@snitchy/core]`);
      Snitchy._displayWarnings(error);

      return null;
    }
  }

  /**
   * Process dynamic values
   * Can access a property or call a method
   *
   * @static
   * @param {*} root element on which getters will be applied
   * @param {string} getters 'property' or 'method'
   * @returns {*} processed value
   * @memberof Snitchy
   */
  static _processValue(root, getters) {
    return getters.reduce((acc, getter) => getter.type === 'property' ?
      acc[getter.name] :
      acc[getter.name](...Array.isArray(getter.value) ? getter.value : [getter.value]), root);
  }

  /**
   * Log some data (debug mode)
   *
   * @static
   * @param {*} data pushed data
   * @param {*} type push, page or event
   * @returns {undefined}
   * @memberof Snitchy
   */
  static _logData(data, type) {
    console.info(`👀 ${type.toUpperCase()}!`, data);
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
   * @memberof Snitchy
   */
  static _displayWarnings(message) {
    console.warn(`👀 ${message}\nFor more informations, see https://github.com/epicagency/snitchy`);
  }

  /**
   * Display errors.
   *
   * @static
   * @param {string | Error | array} fail error(s) or message(s)
   * @memberof Snitchy
   * @returns {undefined}
   */
  static _displayErrors(fail) {
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
