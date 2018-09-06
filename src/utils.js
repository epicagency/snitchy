/**
 * Check validity
 *
 * @export
 * @param {object} variables data
 * @throws {Error} if error found
 * @returns {undefined}
 */
export function validate(variables) {
  // For components, trigger means "auto" submit
  // so values can not be passed…
  forEach(variables.components, component => {
    Object.keys(component)
      // Filter if optional trigger
      .filter(layer => component[layer].trigger)
      .forEach(layer => {
        // Prepare data
        const data = component[layer];

        forEach(data, value => {
          if (value.match(/^\$val/)) {
            throw new Error('🚨 Values ($val…) are not allowed for components with "trigger"');
          }
        });
      });
  });
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

/**
 * ForEach for array/object (basic version)
 *
 * @param {Array|Object} collection "collection" to loop over
 * @param {Function} iteratee callback
 * @returns {Array|Object} initial collection
 */
export function forEach(collection, iteratee) {
  if (collection.forEach === undefined) {
    Object.keys(collection).forEach(key => {
      iteratee(collection[key], key);
    });
  } else {
    collection.forEach(iteratee);
  }

  return collection;
}

/**
* Convert camelCase to kebab-case
*
* @param {String} value original
* @returns {String} kebab-cased
*/
export function kebabCase(value) {
  return value
    .toString()
    .replace(
      /([A-Z])/g,
      (_, char) => `-${char.toLowerCase()}`
    );
}

/**
* Convert kebab-case to camelCase
*
* @param {String} value original
* @returns {String} camel-cased
*/
export function camelCase(value) {
  return value
    .toString()
    .replace(
      /(-[a-z])/g,
      (_, char) => `${char.replace('-', '').toUpperCase()}`
    );
}

/**
 * Display errors.
 *
 * @static
 * @param {string | Error | array} fail error(s) or message(s)
 * @returns {undefined}
 */
export function displayErrors(fail) {
  const fails = Array.isArray(fail) ? fail : [fail];
  const errors = [];

  fails.forEach(fail => {
    if (typeof fail === 'string') {
      errors.push(new Error(`📈 ${fail}\nFor more informations, see https://github.com/epicagency/snitchy`));
    } else {
      errors.push(fail);
    }
  });

  // DEV find replacement
  // throw new AggregateError(errors);
  throw new Error(errors[0]);
}

/**
 * Display warnings.
 *
 * @static
 * @param {string} message custom message
 * @returns {undefined}
 */
export function displayWarnings(message) {
  console.warn(`📈 ${message}\nFor more informations, see…(documentation link)`);
}
