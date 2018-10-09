/* global it, expect, afterEach */
import snitchy from '../src';

afterEach(() => {
  const el = document.documentElement;

  while (el.attributes.length > 0) {
    el.removeAttribute(el.attributes[0].name);
  }

  document.body.innerHTML = '';
});

it.skip('throws error getting missing property', () => {
  function get() { // eslint-disable-line require-jsdoc
    snitchy._getValue('$thisProp');
  }

  expect(get).toThrow('Unable to find "prop" property.');
});

it('gets this property', () => {
  const expected = 'value';

  snitchy.scope = { prop: expected };

  const result = snitchy._getValue('$thisProp');

  expect(result).toBe(expected);
});
