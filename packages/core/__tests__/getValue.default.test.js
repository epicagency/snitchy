/* global it, expect, jest, afterEach */
import snitchy from '../src';

afterEach(() => {
  const el = document.documentElement;

  while (el.attributes.length > 0) {
    el.removeAttribute(el.attributes[0].name);
  }

  document.body.innerHTML = '';
});

global.console = {
  ...global.console,
  warn: jest.fn(),
};

it('gets null on invalid $value', () => {
  const result = snitchy._getValue('$invalid');

  expect(result).toBeNull();
});

it('displays a warning on invalid $value', () => {
  snitchy._getValue('$invalid');

  expect(global.console.warn).toHaveBeenCalled();
});

it('gets defaults $value', () => {
  const expected = 'defaults';
  const result = snitchy._getValue(`$attrMissing=${expected}`);

  expect(result).toBe(expected);
});

it('displays a warning on non optional missing $value', () => {
  snitchy._getValue('$attrMissing');

  expect(global.console.warn).toHaveBeenCalled();
});

it('gets null on optional missing $value', () => {
  const result = snitchy._getValue('$attrMissing');

  expect(result).toBeNull();
});
