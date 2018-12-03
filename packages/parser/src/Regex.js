import XRegExp from 'xregexp/src/xregexp.js';
import { lcfirst } from '@snitchy/utils';

/**
 * Filter rules to be used to build different parts of the regex
 *
 * @param {string} type rules are first filtered by type
 * @param {array} rules rules array
 * @param {object} [options={}] additional filtering options
 * @returns {array} filtered rules
 */
function filter(type, rules, options = {}) {
  const rulesByType = rules.filter(rule => rule.type === type);
  const keys = Object.keys(options);

  if (keys.length === 0) {
    return rulesByType.map(rule => rule.name);
  }

  return rulesByType.reduce((acc, rule) => {
    let match = 0;

    keys.forEach(key => {
      if (rule[key] === options[key] || rule[key] === undefined) {
        match += 1;
      }
    });

    if (match === keys.length) {
      acc.push(rule.name);
    }

    return acc;
  }, []);
}

const regex = {
  init(rules) {
    this._rules = Object.keys(rules).map(name => ({
      name,
      ...rules[name].pattern,
    }));
    this._rulesByName = Object.keys(rules).reduce((acc, cur) => {
      acc[cur] = rules[cur].pattern;

      return acc;
    }, {});

    // Get data to build regexes
    const elements = filter('element', this._rules);
    const params = filter('param', this._rules);
    const paramsWithValue = filter('param', this._rules, { useValue: true });
    const paramsWithNoValue = filter('param', this._rules, { useValue: false });
    const paramsWithExtra = this._rules
      .filter(rule => rule.type === 'param' && rule.useExtra)
      .reduce((values, item) => /* istanbul ignore next */ item.useExtra.match(/,/) ?
        values.concat(item.useExtra.split(',')) :
        values.concat(item.useExtra),
      []);

    /* eslint-disable new-cap */
    this._regexes = {
      element: XRegExp(`^(?<element>${elements.join('|')})`),
      name: XRegExp(`^(?<name>[a-z0-9]+?)(?=${params.join('|')})`, 'i'),
      param: XRegExp(`^(?<param>${paramsWithNoValue.join('|')}|(${paramsWithValue.join('|')})(?=[A-Z]))`),
      extra: XRegExp(`^(?<extra>${paramsWithExtra.join('|')})`),
      value: XRegExp('^(?<value>[a-z0-9]+)', 'i'),
      filters: XRegExp('^(\\|)(?<filters>[^=?]+)'),
      defaults: XRegExp('^(=)(?<defaults>.*)'),
      optional: XRegExp('^(?<optional>\\?)'),
    };
    /* eslint-enable new-cap */

    return this;
  },

  /**
   * Executes check by type
   *
   * @param {string} type rule type (element, param, …)
   * @param {object} token token for storing results
   * @param {string} token.toParse string for parsing
   * @returns {boolean} has match
   * @memberof Regex
   */
  check(type, token) {
    // DEV (fixed with throwed errors?)
    // if (!token.valid) {
    //   return false;
    // }

    // Match for name only if element uses name
    if (type === 'name' && token.element && this._rulesByName[token.element].useName === false) {
      return false;
    }

    const match = this.match(type, token);

    switch (type) {
      case 'param':
        // If element…
        if (token.element) {
          // With param has no param
          if (this._rulesByName[token.element].useParam === true && !token.param) {
            throw new Error(`Invalid param/value for [${token.element}] [@snitchy/parser]`);
          }
        }
        // If param…
        if (token.param) {
          // With element has no element
          if (this._rulesByName[token.param].useElement === true && !token.element) {
            throw new Error(`Param [${token.param}] should use an element [@snitchy/parser]`);
          }
          // Without element has element
          if (this._rulesByName[token.param].useElement === false && token.element) {
            throw new Error(`Param [${token.param}] do not accept element [${token.element}] [@snitchy/parser]`);
          }
        }
        // If no element neither param
        if (!token.element && !token.param) {
          throw new Error('Invalid param/value [@snitchy/parser]');
        }
        break;
      case 'value':
        // If param…
        /* istanbul ignore else */
        if (token.param) {
          // Without value has value
          if (this._rulesByName[token.param].useValue === false && token.value) {
            throw new Error(`Param [${token.param}] do not accept value [${token.value}] [@snitchy/parser]`);
          }
        }
        break;
      case 'filters':
        if (token.filters) {
          // Format value
          /* istanbul ignore next */
          token.filters = token.filters.match('|') ? token.filters.split('|') : [token.filters];
        }
        break;
      case 'optional':
        if (token.optional) {
          // Format value
          token.optional = true;
        }
        break;
      default:
    }

    return match;
  },

  /**
   * Check if string match with type
   *
   * @param {string} type rule type (element, param, …)
   * @param {object} token token for storing results
   * @param {string} token.toParse string for parsing
   * @returns {boolean} has match
   * @memberof Regex
   */
  match(type, token) {
    // If nothing to parse…
    if (token.toParse === '') {
      return false;
    }

    const hasMatch = XRegExp.exec(token.toParse, this._regexes[type]);

    if (hasMatch) {
      // Add token
      token[type] = hasMatch[type];
      // Remove matching string from toParse
      token.toParse = lcfirst(token.toParse.replace(hasMatch[0], ''));

      return true;
    }

    return false;
  },
};

export default regex;
