/* global it, expect, jest */
import snitchy from '../src';


it('throws error on invalid prefix', () => {
  function get() { // eslint-disable-line require-jsdoc
    snitchy.getValue('$invalid');
  }

  expect(get).toThrow('📈 Unable to find valid "invalid" prefix.');
});

it('adds prefix', () => {
  /* eslint-disable no-empty-function */
  const prefix = {
    fn() {},
    error() {},
  };
  /* eslint-enable no-empty-function */

  snitchy.addPrefix('prefix', prefix);

  expect(snitchy.prefixes.prefix).toEqual(expect.objectContaining(prefix));
});

it('displays warning on adding existing prefix', () => {
  global.console = {
    ...global.console,
    warn: jest.fn(),
  };

  snitchy.addPrefix('attr');

  expect(global.console.warn).toHaveBeenCalled();
});

it('throws error on additional property', () => {
  function add() { // eslint-disable-line require-jsdoc
    snitchy.addPrefix('additional', { extra: '' });
  }

  expect(add).toThrow('Invalid option "extra" [no additional data]');
});

it('throws error on invalid fn', () => {
  function add() { // eslint-disable-line require-jsdoc
    snitchy.addPrefix('invalidFn', { fn: 'invalid' });
  }

  expect(add).toThrow('Invalid option "fn" [should be a function]');
});

it('throws error on invalid error', () => {
  function add() { // eslint-disable-line require-jsdoc
    snitchy.addPrefix('invalidError', { error: 'invalid' });
  }

  expect(add).toThrow('Invalid option "error" [should be a function]');
});

it('removes prefix', () => {
  /* eslint-disable no-empty-function */
  const prefix = {
    fn() {},
    error() {},
  };
  /* eslint-enable no-empty-function */

  snitchy.addPrefix('prefix', prefix);
  snitchy.removePrefix('prefix');

  expect(snitchy.prefixes.prefix).toBeUndefined();
});

it('displays warning on removing non-existing prefix', () => {
  global.console = {
    ...global.console,
    warn: jest.fn(),
  };

  snitchy.removePrefix('nonExisting');

  expect(global.console.warn).toHaveBeenCalled();
});

