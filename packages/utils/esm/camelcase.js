/**
* Convert kebab-case to camelCase
*
* @param {String} value original
* @returns {String} camel-cased
*/
export function camelcase(value) {
  return value
    .toString()
    .replace(
      /(-[a-z])/g,
      (_, char) => `${char.replace('-', '').toUpperCase()}`
    );
}
