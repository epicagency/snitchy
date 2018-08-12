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

it('throws error with no scope', () => {
  function get() { // eslint-disable-line require-jsdoc
    snitchy.getValue('$thisProp');
  }

  expect(get).toThrow('📈 Unable to get "this.prop". No scope found.');
});

it('gets property through scope', () => {
  const expected = 'value';
  const scope = {
    prop: expected,
  };

  snitchy.scope = scope;

  const result = snitchy.getValue('$thisProp');

  expect(result).toBe(expected);
});
