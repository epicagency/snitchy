/* global it, expect */
import snitchy from '../src';

const variables = {
  pages: { foo: 'foo' },
  components: { foo: 'foo' },
};

snitchy.load(variables);

it('throws error getting missing values', () => {
  function get() { // eslint-disable-line require-jsdoc
    snitchy.getValue('$valTest');
  }

  expect(get).toThrow('📈 Unable to get "values.test". No values found.');
});

it('gets value', () => {
  const expected = 'correct';

  snitchy.values = {
    test: expected,
  };

  const result = snitchy.getValue('$valTest');

  expect(result).toBe(expected);
});
