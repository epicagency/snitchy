/* global it, expect */
import snitchy from '../src';


const variables = {
  pages: { foo: 'foo' },
  components: { foo: 'foo' },
};

snitchy.load(variables);

it('throws error on invalid prefix ', () => {
  function get() { // eslint-disable-line require-jsdoc
    snitchy.getValue('$invalid');
  }

  expect(get).toThrow('📈 Unable to find valid "invalid" prefix.');
});

it('throws error on undefined data ', () => {
  function get() { // eslint-disable-line require-jsdoc
    snitchy.getValue('$valUnknown');
  }

  snitchy.values = {};

  expect(get).toThrow('📈 Unable to find "unknown" attribute.');
});

it.skip('returns null for undefined data ', () => {
  snitchy.values = {};

  const result = snitchy.getValue('$valUnknown');

  console.info('RES', result);
  expect(result).toBeNull();
});
