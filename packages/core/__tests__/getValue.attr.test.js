/* global it, expect, afterEach */
import snitchy from '../src';

afterEach(() => {
  const el = document.documentElement;

  while (el.attributes.length > 0) {
    el.removeAttribute(el.attributes[0].name);
  }

  document.body.innerHTML = '';
});

it.skip('throws error getting missing attribute', () => {
  function get() { // eslint-disable-line require-jsdoc
    snitchy._getValue('$attrClass');
  }

  expect(get).toThrow('Unable to find "class" attribute.');
});

it('gets attribute on element', () => {
  const expected = 'value';
  const div = document.createElement('div');

  div.setAttribute('class', expected);
  document.body.appendChild(div);

  const result = snitchy._getValue('$attrClass');

  expect(result).toBe(expected);
});

it('gets attribute on root', () => {
  const expected = 'value';

  document.documentElement.setAttribute('class', expected);

  const result = snitchy._getValue('$attrClass');

  expect(result).toBe(expected);
});

it('gets compound attribute', () => {
  const expected = 'value';
  const div = document.createElement('div');

  div.setAttribute('data-com-pound', expected);
  document.body.appendChild(div);

  const result = snitchy._getValue('$dataComPound');

  expect(result).toBe(expected);
});

it('gets attribute on $el', () => {
  const expected = 'value';
  const div = document.createElement('div');

  div.setAttribute('class', expected);
  snitchy.scope = { $el: div };

  const result = snitchy._getValue('$elAttrClass');

  expect(result).toBe(expected);
});

it('gets attribute on $refs', () => {
  const expected = 'value';
  const div = document.createElement('div');

  div.setAttribute('class', expected);
  snitchy.scope = {
    $refs: {
      name: div,
    },
  };

  const result = snitchy._getValue('$refNameAttrClass');

  expect(result).toBe(expected);
});
