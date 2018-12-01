/**
 * Get element by CSS selector.
 *
 * @param {string} selector CSS selector
 * @param {HTMLElement} scope DOM element to query inside
 * @returns {HTMLElement} queried DOM element
 */
export function qs(selector, scope) {
  return (scope || document).querySelector(selector);
}
