/* global it, expect, jest, afterEach */
import snitchy from '../src';

global.console = {
  ...global.console,
  warn: jest.fn(),
};

afterEach(() => {
  const el = document.body;

  while (el.attributes.length > 0) {
    el.removeAttribute(el.attributes[0].name);
  }

  document.body.innerHTML = '';
});

it('returns "null" if no variables', () => {
  const result = snitchy.page();

  expect(result).toBeNull();
});

it('has no defaults', () => {
  const variables = {
    pages: {},
    events: {},
  };

  snitchy.load(variables);
  snitchy.page();

  expect(global.console.warn).toHaveBeenCalled();
  expect(snitchy.values).toBeUndefined();
  expect(snitchy.scope).toBeUndefined();
});

it('displays warning on invalid layer', () => {
  const variables = {
    pages: {},
    events: {},
  };

  snitchy.load(variables);
  const result = snitchy.page({});

  expect(result).toBeNull();
  expect(global.console.warn).toHaveBeenCalled();
});

it('displays warning on missing layer', () => {
  const variables = {
    pages: {
      all: {
        otherLayer: {},
      },
    },
    events: {},
  };

  snitchy.load(variables);
  const result = snitchy.page('layer');

  expect(result).toBeNull();
  expect(global.console.warn).toHaveBeenCalled();
});


it('displays warning on invalid namespace layer', () => {
  const variables = {
    pages: {
      all: {
        layer: {},
      },
    },
    events: {},
  };

  snitchy.load(variables);
  const result = snitchy.page('layer', null, null, ['invalid']);

  expect(result).toBeNull();
  expect(global.console.warn).toHaveBeenCalled();
});
