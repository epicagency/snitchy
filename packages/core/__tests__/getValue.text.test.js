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
    snitchy._getValue('$elText');
  }

  expect(get).toThrow('Unable to find "$el" element.');
});

it('gets text on $el', () => {
  const expected = 'value';
  const div = document.createElement('div');

  div.textContent = expected;
  snitchy.scope = { $el: div };

  document.body.appendChild(div);

  const result = snitchy._getValue('$elText');

  expect(result).toBe(expected);
});

it('gets text on $refs', () => {
  const expected = 'value';
  const div = document.createElement('div');

  div.textContent = expected;
  snitchy.scope = {
    $refs: {
      name: div,
    },
  };

  const result = snitchy._getValue('$refNameText');

  expect(result).toBe(expected);
});
