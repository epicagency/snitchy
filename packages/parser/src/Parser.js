import regex from './regex.js';

const parser = {
  init(rules) {
    this._regex = regex.init(rules);

    return this;
  },

  /**
   * Parse a dynamic value
   *
   * @export
   * @param {string} str value to parse, should begin with '$' and match some rule
   * @returns {undefined}
   */
  parse(str) {
    const token = {
      toParse: str.replace('$', ''),
    };

    try {
      if (this._regex.check('element', token)) {
        this._regex.check('name', token);
      }

      /* istanbul ignore else */
      if (this._regex.check('param', token)) {
        this._regex.check('extra', token);
        this._regex.check('value', token);
      }

      this._regex.check('filters', token);
      this._regex.check('defaults', token);
      this._regex.check('optional', token);

      // DEV (fixed with throwed errors?)
      // if (!token.element && !token.param) {
      //   token.valid = false;
      // }

      return token;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default parser;
