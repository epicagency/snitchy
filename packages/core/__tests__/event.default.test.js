/* global it, expect, afterEach */
import snitchy from '../src';

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

it('returns "null" if no name', () => {
  const variables = {
    pages: {},
    events: {},
  };

  snitchy.load(variables);
  const result = snitchy.event('name');

  expect(result).toBeNull();
});
