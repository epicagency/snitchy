/**
* Convert camelCase to kebab-case
*
* @param {String} value original
* @returns {String} kebab-cased
*/
export function kebabcase(value) {
  return value
    .toString()
    .replace(
      /([A-Z])/g,
      (_, char) => `-${char.toLowerCase()}`
    );
}
