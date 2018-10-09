/**
 * Lowercase first
 *
 * @param {string} str string to format
 * @returns {string} formatted string
 */
export function lcfirst(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}
