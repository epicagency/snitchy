/* global it, expect, afterEach */
import snitchy from '../src';

afterEach(() => {
  const el = document.documentElement;

  while (el.attributes.length > 0) {
    el.removeAttribute(el.attributes[0].name);
  }

  document.body.innerHTML = '';
});

it.skip('throws error getting missing …', () => {
  function get() { // eslint-disable-line require-jsdoc
    snitchy._getValue('$attrClass');
  }

  expect(get).toThrow('unable to find "class" attribute.');
});

it('gets url', () => {
  const expected = 'http://localhost/';
  const result = snitchy._getValue('$url');

  expect(result).toBe(expected);
});

it('gets url hash', () => {
  window.history.pushState({}, 'Test URL', '/#value');

  const expected = 'value';
  const result = snitchy._getValue('$urlHash');

  expect(result).toBe(expected);
});

it('gets url search param', () => {
  window.history.pushState({}, 'Test URL', '/?key=value');

  const expected = 'value';
  const result = snitchy._getValue('$urlSearchKey');

  expect(result).toBe(expected);
});


it('gets url search complex param', () => {
  window.history.pushState({}, 'Test URL', '/?foo=bar&key=value&baz=qux');

  const expected = 'value';
  const result = snitchy._getValue('$urlSearchKey');

  expect(result).toBe(expected);
});
