/* global it, expect, jest */
import snitchy from '../src';

const variables = {
  pages: { foo: 'foo' },
  components: { foo: 'foo' },
};

snitchy.load(variables);

it('gets url', () => {
  const expected = 'http://localhost/';

  const result = snitchy.getValue('$url');

  expect(result).toBe(expected);
});

it('throws error with no param', () => {
  function get() { // eslint-disable-line require-jsdoc
    snitchy.getValue('$urlParamMissing');
  }

  expect(get).toThrow('📈 No keyword "param" or "missing" found in "window.location.search"');
});

it('throws error with incorrect param', () => {
  function get() { // eslint-disable-line require-jsdoc
    snitchy.getValue('$urlPortnawakKey');
  }

  expect(get).toThrow('📈 No keyword "param" or "key" found in "window.location.search"');
});

it('throws error with missing key', () => {
  window.history.pushState({}, 'Test URL', '/?key=value');

  function get() { // eslint-disable-line require-jsdoc
    snitchy.getValue('$urlParamMissing');
  }

  expect(get).toThrow('📈 No keyword "param" or "missing" found in "window.location.search"');
});

it('gets url param', () => {
  window.history.pushState({}, 'Test URL', '/?key=value');

  const expected = 'value';
  const result = snitchy.getValue('$urlParamKey');

  expect(result).toBe(expected);
});
