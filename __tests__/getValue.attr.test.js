/* global it, expect, afterEach */
import snitchy from '../src';

const variables = {
  pages: { foo: 'foo' },
  components: { foo: 'foo' },
};

snitchy.load(variables);

afterEach(() => {
  const el = document.documentElement;

  while (el.attributes.length > 0) {
    el.removeAttribute(el.attributes[0].name);
  }

  document.body.innerHTML = '';
});

it('throws error getting missing attribute', () => {
  function get() { // eslint-disable-line require-jsdoc
    snitchy.getValue('$attrClass');
  }

  expect(get).toThrow('📈 Unable to find "class" attribute.');
});

it('gets attribute on element', () => {
  const expected = 'hasClass';
  const div = document.createElement('div');

  div.setAttribute('class', expected);
  document.body.appendChild(div);

  const result = snitchy.getValue('$attrClass');

  expect(result).toBe(expected);
});

it('gets attribute on root', () => {
  const expected = 'hasClass';

  document.documentElement.setAttribute('class', expected);

  const result = snitchy.getValue('$attrClass');

  expect(result).toBe(expected);
});


it('gets compound attribute', () => {
  const expected = 'hasDataAttribute';
  const div = document.createElement('div');

  div.setAttribute('data-attribute', expected);
  document.body.appendChild(div);

  const result = snitchy.getValue('$attrDataAttribute');

  expect(result).toBe(expected);
});
