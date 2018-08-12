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

it('throws error getting missing tag', () => {
  function get() { // eslint-disable-line require-jsdoc
    snitchy.getValue('$tagDiv');
  }

  expect(get).toThrow('📈 Unable to find "div" element.');
});

it('gets element inside body', () => {
  const expected = 'elementContent';
  const div = document.createElement('div');

  div.textContent = expected;
  document.body.appendChild(div);

  const result = snitchy.getValue('$tagDiv');

  expect(result).toBe(expected);
});

it('gets element inside root', () => {
  const expected = 'elementContent';
  const title = document.createElement('title');

  title.textContent = expected;
  document.head.appendChild(title);

  const result = snitchy.getValue('$tagTitle');

  expect(result).toBe(expected);
});
