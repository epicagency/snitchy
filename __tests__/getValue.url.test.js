/* global it, expect */
import snitchy from '../src';

const variables = {
  pages: { foo: 'foo' },
  components: { foo: 'foo' },
};

snitchy.load(variables);

it.skip('throws error with no location', () => {
  function get() { // eslint-disable-line require-jsdoc
    snitchy.getValue('$url');
  }

  delete window.location.href;

  expect(get).toThrow('📈 Unable to get "window.location.href');
});

it('gets url', () => {
  const expected = 'http://localhost/';

  const result = snitchy.getValue('$url');

  expect(result).toBe(expected);
});
