import Regex from './Regex.js';
import { lcfirst } from '@snitchy/utils';

export default class Parser {
  #regex;

  constructor(rules) {
    this.#regex = new Regex(rules);
  }

  /**
   * Parse a dynamic value
   *
   * @export
   * @param {string} str value to parse, should begin with '$' and match some rule
   * @returns {undefined}
   */
  parse(str) {
    const res = this.#regex.exec(str);

    if (res === null) {
      // DEV
      // throw new Error(`👀 @snitchy/parser: invalid value [no matching results for '${str}']`);

      return null;
    }

    const { param, value, extra, element, name, defaults, filters, optional } = res;
    const token = {};

    token.param = param.toLowerCase();

    if (value) {
      token.value = lcfirst(value);
    }

    if (extra) {
      token.extra = extra.toLowerCase();
    }

    if (element) {
      token.element = element;

      if (name) {
        token.name = lcfirst(name);
      }
    }

    if (defaults) {
      token.defaults = defaults;
    }

    if (filters) {
      /* istanbul ignore next */
      token.filters = filters.match('|') ? filters.split('|') : [filters];
    }

    if (optional) {
      token.optional = true;
    }

    return token;
  }
}
