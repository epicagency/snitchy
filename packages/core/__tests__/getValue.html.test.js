/* global it, expect, afterEach */
import snitchy from '../src';

afterEach(() => {
  const el = document.documentElement;

  while (el.attributes.length > 0) {
    el.removeAttribute(el.attributes[0].name);
  }

  document.body.innerHTML = '';
});

it.skip('throws error getting missing element', () => {
  function get() { // eslint-disable-line require-jsdoc
    snitchy._getValue('$elHtml');
  }

  expect(get).toThrow('Unable to find "$el" element.');
});

it('gets html on $el', () => {
  const expected = '<span>value</span>';
  const div = document.createElement('div');

  div.innerHTML = expected;
  snitchy.scope = { $el: div };

  document.body.appendChild(div);

  const result = snitchy._getValue('$elHtml');

  expect(result).toBe(expected);
});

it('gets html on $refs', () => {
  const expected = '<span>value</span>';
  const div = document.createElement('div');

  div.innerHTML = expected;
  snitchy.scope = {
    $refs: {
      name: div,
    },
  };

  const result = snitchy._getValue('$refNameHtml');

  expect(result).toBe(expected);
});
