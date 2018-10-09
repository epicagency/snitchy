/**
 * Uppercase first
 *
 * @param {string} str string to format
 * @returns {string} formatted string
 */
export function ucfirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
