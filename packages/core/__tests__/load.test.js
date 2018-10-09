/* global it, expect */
import snitchy from '../src';

it('throws error on no variables loaded', () => {
  function loaded() { // eslint-disable-line require-jsdoc
    snitchy._hasVariables();
  }
  expect(snitchy.variables).toBeFalsy();
  expect(loaded).toThrow('No "variables" found. Are they loaded?');
});

it('throws error on undefined variables', () => {
  function load() { // eslint-disable-line require-jsdoc
    snitchy.load();
  }

  expect(load).toThrow('Invalid parameter "variables" [undefined]');
});

it('loads variables', () => {
  const variables = {
    pages: { foo: 'foo' },
    events: { foo: 'foo' },
  };

  snitchy.load(variables);

  expect(snitchy.variables).toStrictEqual(variables);
});

it('throws error on additional property', () => {
  function load() { // eslint-disable-line require-jsdoc
    snitchy.load({
      extra: '',
    });
  }

  expect(load).toThrow('Invalid option "extra" [no additional data]');
});

it('throws error on invalid page options', () => {
  function load() { // eslint-disable-line require-jsdoc
    snitchy.load({
      pages: '',
    });
  }

  expect(load).toThrow('Invalid option "pages" [should be an object]');
});

it('throws error on invalid events options', () => {
  function load() { // eslint-disable-line require-jsdoc
    snitchy.load({
      events: '',
    });
  }

  expect(load).toThrow('Invalid option "events" [should be an object]');
});
