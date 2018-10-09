/**
 * Check validity
 *
 * @export
 * @param {object} variables data
 * @throws {Error} if error found
 * @returns {undefined}
 */
export function validate(variables) {
  return variables;
}

/**
 * Get element by CSS selector.
 *
 * @param {String} selector CSS selector
 * @param {HTMLElement} scope DOM element to query inside
 * @returns {HTMLElement} queried DOM element
 */
export function qs(selector, scope) {
  return (scope || document).querySelector(selector);
}
