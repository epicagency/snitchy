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
    snitchy.getValue('$prefixUnknown');
  }

  expect(get).toThrow('Something went wrong with "unknown" (No error message for "prefix").');
});

it('throws custom prefix error', () => {
  snitchy.removePrefix('prefix');
  class MyError extends Error {}
  /* eslint-disable no-empty-function */
  const prefix = {
    fn() {
      throw new Error();
    },
    error() {
      const err = new MyError();

      err.name = 'MyError';
      err.message = 'Custom message.';
      throw err;
    },
  };
  /* eslint-enable no-empty-function */

  snitchy.addPrefix('prefix', prefix);

  function get() { // eslint-disable-line require-jsdoc
    snitchy.getValue('$prefixUnknown');
  }

  expect(get).toThrow('Custom message.');
});

it('throws error with undefined value', () => {
  const values = {};

  snitchy.values = values;

  function get() { // eslint-disable-line require-jsdoc
    snitchy.getValue('$valUnknown');
  }

  expect(get).toThrow('📈 Unable to find "unknown" value.');
});

it('throws error with undefined property', () => {
  const scope = {};

  snitchy.scope = scope;

  function get() { // eslint-disable-line require-jsdoc
    snitchy.getValue('$thisUnknown');
  }

  expect(get).toThrow('📈 Unable to find "unknown" property.');
});
