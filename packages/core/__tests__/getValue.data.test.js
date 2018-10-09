/* global it, expect, afterEach */
import snitchy from '../src';

afterEach(() => {
  const el = document.documentElement;

  while (el.attributes.length > 0) {
    el.removeAttribute(el.attributes[0].name);
  }

  document.body.innerHTML = '';
});

it.skip('throws error getting missing data-attribute', () => {
  function get() { // eslint-disable-line require-jsdoc
    snitchy._getValue('$dataAttr');
  }

  expect(get).toThrow('Unable to find "data-attr" attribute.');
});

it('gets data-attribute on element', () => {
  const expected = 'value';
  const div = document.createElement('div');

  div.setAttribute('data-attr', expected);
  document.body.appendChild(div);

  const result = snitchy._getValue('$dataAttr');

  expect(result).toBe(expected);
});

it('gets data-attribute on root', () => {
  const expected = 'value';

  document.documentElement.setAttribute('data-attr', expected);

  const result = snitchy._getValue('$dataAttr');

  expect(result).toBe(expected);
});

it('gets compound data-attribute', () => {
  const expected = 'value';
  const div = document.createElement('div');

  div.setAttribute('data-compound-attr', expected);
  document.body.appendChild(div);

  const result = snitchy._getValue('$dataCompoundAttr');

  expect(result).toBe(expected);
});

it('gets data-attribute on $el', () => {
  const expected = 'value';
  const div = document.createElement('div');

  div.setAttribute('data-attr', expected);
  snitchy.scope = { $el: div };

  const result = snitchy._getValue('$elDataAttr');

  expect(result).toBe(expected);
});

it('gets data-attribute on $refs', () => {
  const expected = 'value';
  const div = document.createElement('div');

  div.setAttribute('data-attr', expected);
  snitchy.scope = {
    $refs: {
      name: div,
    },
  };

  const result = snitchy._getValue('$refNameDataAttr');

  expect(result).toBe(expected);
});
