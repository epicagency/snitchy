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
  const result = snitchy.event();

  expect(result).toBeNull();
});

it('throws error on invalid name', () => {
  const variables = {
    pages: {},
    events: {},
  };

  snitchy.load(variables);

  function event() { // eslint-disable-line require-jsdoc
    snitchy.event({});
  }

  expect(event).toThrow('Expected argument "name" to be of type `string`');
});

it('displays warning on invalid layer', () => {
  const variables = {
    pages: {},
    events: {},
  };

  snitchy.load(variables);
  const result = snitchy.event('name', { layer: {} });

  expect(result).toBeNull();
  expect(global.console.warn).toHaveBeenCalled();
});

it('displays warning on invalid event', () => {
  const variables = {
    pages: {},
    events: {},
  };

  snitchy.load(variables);
  const result = snitchy.event('name', { event: {} });

  expect(result).toBeNull();
  expect(global.console.warn).toHaveBeenCalled();
});

it('displays warning on invalid trigger', () => {
  const variables = {
    pages: {},
    events: {},
  };

  snitchy.load(variables);
  const result = snitchy.event('name', { trigger: {} });

  expect(result).toBeNull();
  expect(global.console.warn).toHaveBeenCalled();
});

it('has no defaults', () => {
  const variables = {
    pages: {},
    events: {},
  };

  snitchy.load(variables);

  function event() { // eslint-disable-line require-jsdoc
    snitchy.event({});
  }

  expect(event).toThrow('Expected argument "name" to be of type `string`');
  expect(snitchy.values).toBeUndefined();
  expect(snitchy.scope).toBeUndefined();
});

it('returns "null" if no name', () => {
  const variables = {
    pages: {},
    events: {},
  };

  snitchy.load(variables);
  const result = snitchy.event('name');

  expect(result).toBeNull();
});
