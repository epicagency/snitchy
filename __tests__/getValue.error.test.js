/* global it, expect */
import snitchy from '../src';

it('displays warning on missing prefix error function', () => {
  /* eslint-disable no-empty-function */
  const prefix = {
    fn() {
      throw new Error();
    },
  };
  /* eslint-enable no-empty-function */

  snitchy.addPrefix('prefix', prefix);

  function get() { // eslint-disable-line require-jsdoc
    snitchy.getValue('$prefixFoo');
  }

  expect(get).toThrow('Something went wrong with "foo" (No error message for "prefix").');
});
