import XRegExp from 'xregexp';
import { ucfirst } from '@snitchy/utils';

export default class Regex {
  #rules;
  #r;

  /**
   * Pattern: keyword(rule property), [] = optional (only param is mandatory)
   *
   * [element (token)
   *    [name (value)]
   * ]
   * param(token)
   *    [extra (extra)]
   *    [value (value)]
   * [filters]
   * [defaults|optional]
   *
   * @param {object} rules rules to build the regex
   */
  constructor(rules) {
    // eslint-disable-next-line no-redeclare
    this.#rules = Object.keys(rules).map(name => ({
      name,
      ...rules[name].pattern,
    }));

    /* eslint-disable object-property-newline */
    const elements = this._filter('element');
    const elementsValue = this._filter('element', { useValue: true });
    const paramsElement = this._filter('param', { useElement: true });
    const paramsValue = this._filter('param', { useValue: true });
    const paramsElementValue = this._filter('param', { useElement: true, useValue: true });
    const paramsNoElementNoValue = this._filter('param', { useElement: false, useValue: false });
    const paramsElementNoValue = this._filter('param', { useElement: true, useValue: false });
    // Unused
    // const elementsNoValue = this._filter('element', { useValue: false });
    // const params = this._filter('param');
    // const paramsNoElement = this._filter('param', { useElement: false });
    // const paramsNoValue = this._filter('param', { useValue: false });
    // const paramsNoElementValue = this._filter('param', { useElement: false, useValue: true });
    const extraRules = this.#rules.filter(rule => rule.type === 'param' && rule.useExtra);
    const extraParams = extraRules.map(rule => rule.name);
    /* istanbul ignore next */
    const extraValues = extraRules.reduce((values, item) => item.useExtra.match(/,/) ?
      values.concat(item.useExtra.split(',')) :
      values.concat(item.useExtra),
    []);
    /* eslint-enable object-property-newline */

    XRegExp.install('natives');
    this.#r = XRegExp( // eslint-disable-line new-cap
      `^\\$

      # Element
      (?:
        # Elements without value (eg: el)
        (?<element>${elements.join('|')})

        # Elements with value (eg: ref) -> followed by param with element
        (?<name>(?<=${elementsValue.join('|')})[A-Za-z0-9]+?(?=${paramsElement.map(type => ucfirst(type)).join('|')}))?
      )?

      # Param
      (?<param>
        # Params without element
        ## Without value -> end of word
        (?:${paramsNoElementNoValue.join('|')})\\b|

        ## With value -> followed by value (CamelCase)
        (?:${paramsValue.join('|')})(?=[A-Z]{1}[A-Za-z0-9]+)|

        # Params with element
        ## Without value -> end of word
        (?:${paramsElementNoValue.map(type => ucfirst(type)).join('|')})\\b|

        ## With value -> followed by value (CamelCase)
        (?:${paramsElementValue.map(type => ucfirst(type)).join('|')})(?=[A-Z]{1}[A-Za-z0-9]+)

      )

      # Extra -> extra param followed by extra value
      (?<extra>(?<=${extraParams.join('|')})${extraValues.map(type => ucfirst(type)).join('|')})?

      # Value
      (?<value>[A-Za-z0-9]*)

      # Filters -> '|filterName'
      (?:
        \\|(?<filters>[^?=]+)
        )?

      # Defaults -> '=defaults'
      (?:
        =(?<defaults>.+)
      )?

      # Optional -> '?'
      (?<optional>\\?)?

      $`, 'x');
  }

  /**
   * Filter rules to be used to build different parts of the regex
   *
   * @param {string} type rules are first filtered by type
   * @param {object} [options={}] additional filtering options
   * @returns {array} filtered rules
   */
  _filter(type, options = {}) {
    const rulesByType = this.#rules.filter(rule => rule.type === type);
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

  /**
   * Executes a search for a match in a specified string
   *
   * @export
   * @param {string} str she string against which to match the regular expression
   * @returns {array} results with matched values
   */
  exec(str) {
    return XRegExp.exec(str, this.#r);
  }
}
