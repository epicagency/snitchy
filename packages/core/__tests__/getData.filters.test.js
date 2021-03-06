/* global it, expect, afterEach, jest */
import snitchy from '../src';

const variables = {
  pages: { foo: 'foo' },
  events: { foo: 'foo' },
};

snitchy.load(variables);

afterEach(() => {
  const el = document.documentElement;

  while (el.attributes.length > 0) {
    el.removeAttribute(el.attributes[0].name);
  }

  document.body.innerHTML = '';

  snitchy.scope = undefined;
});

global.console = {
  ...global.console,
  warn: jest.fn(),
};

it('filters with lowercase', () => {
  const expected = 'value';

  snitchy.scope = {
    prop: expected.toUpperCase(),
  };

  const result = snitchy._getValue('$thisProp|lowercase');

  expect(result).toBe(expected);
});

it('filters with uppercase', () => {
  const expected = 'VALUE';

  snitchy.scope = {
    prop: expected.toLowerCase(),
  };

  const result = snitchy._getValue('$thisProp|uppercase');

  expect(result).toBe(expected);
});

it('filters with method', () => {
  const expected = 'foo-bar';

  snitchy.scope = {
    prop: ['foo', 'bar'],
  };

  const result = snitchy._getValue('$thisProp|join("-")');

  expect(result).toBe(expected);
});

it('filters with invalid method', () => {
  snitchy.scope = {};
  snitchy._getValue('$thisProp|join(-)');

  expect(global.console.warn).toHaveBeenCalled();
});

it('filters with lowercase|join', () => {
  const expected = 'foo-bar';

  snitchy.scope = {
    prop: ['FOO', 'BAR'],
  };

  const result = snitchy._getValue('$thisProp|join("-")|lowercase');

  expect(result).toBe(expected);
});
