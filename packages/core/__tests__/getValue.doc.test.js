/* global it, expect, afterEach */
import snitchy from '../src';

afterEach(() => {
  const el = document.documentElement;

  while (el.attributes.length > 0) {
    el.removeAttribute(el.attributes[0].name);
  }

  document.body.innerHTML = '';
});

it.skip('throws error getting missing doc attribute', () => {
  function get() { // eslint-disable-line require-jsdoc
    snitchy._getValue('$docMissing');
  }

  expect(get).toThrow('Unable to find "missing" property.');
});

it('gets doc', () => {
  const expected = 'value';

  document.property = expected;

  const result = snitchy._getValue('$docProperty');

  expect(result).toBe(expected);
});
