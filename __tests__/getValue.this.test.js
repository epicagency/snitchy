/* global it, expect, afterEach */
import snitchy from '../src';

const variables = {
  pages: { foo: 'foo' },
  components: { foo: 'foo' },
};

snitchy.load(variables);

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

it('gets compound property through scope', () => {
  const expected = 'value';
  const scope = {
    compoundProp: expected,
  };

  snitchy.scope = scope;

  const result = snitchy.getValue('$thisCompoundProp');

  expect(result).toBe(expected);
});
