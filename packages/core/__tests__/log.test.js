/* global it, expect, jest */
import snitchy from '../src';

global.console = {
  ...global.console,
  info: jest.fn(),
  table: jest.fn(),
};

it('displays logs on "push()"', () => {
  snitchy.debug = true;
  snitchy._push({});

  expect(global.console.info).toHaveBeenCalled();
  expect(global.console.table).toHaveBeenCalled();
});

it('displays logs on "set()"', () => {
  window.dataLayer = undefined;

  snitchy.debug = true;
  snitchy._set({});

  expect(global.console.info).toHaveBeenCalled();
  expect(global.console.table).toHaveBeenCalled();
});

it('throws error on missing dataLayer', () => {
  window.dataLayer = null;
  snitchy.debug = false;

  function push() { // eslint-disable-line require-jsdoc
    snitchy._push({});
  }

  expect(push).toThrow('No "dataLayer" found. Check if GTM is correctly configured');
});
