/* global it, expect */
import snitchy from '../src';

it('throws error on no variables loaded', () => {
  expect(snitchy.variables).toBeFalsy();
  expect(snitchy.isLoaded).toThrow('📈 No "variables" found [snitchy.variables]. Are they loaded?');
});

it('loads variables', () => {
  const variables = {
    pages: { foo: 'foo' },
    components: { foo: 'foo' },
  };

  snitchy.load(variables);

  expect(snitchy.variables).toMatchObject(variables);
  expect(snitchy.isLoaded()).toMatchObject(variables);
});

it('throws error on additional property', () => {
  function load() { // eslint-disable-line require-jsdoc
    snitchy.load({
      foo: 'foo',
    });
  }

  expect(load).toThrow('options[\'foo\'] is an invalid additional property');
});

it('throws error on invalid page options', () => {
  function load() { // eslint-disable-line require-jsdoc
    snitchy.load({
      pages: 'foo',
    });
  }

  expect(load).toThrow('options.pages should be object');
});

it('throws error on invalid components options', () => {
  function load() { // eslint-disable-line require-jsdoc
    snitchy.load({
      components: 'foo',
    });
  }

  expect(load).toThrow('options.components should be object');
});

it('throws error on invalid variables data', () => {
  function load() { // eslint-disable-line require-jsdoc
    snitchy.load({
      components: {
        slug: {
          test: {
            trigger: 'click',
            key: '$valInvalid',
          },
        },
      },
    });
  }

  expect(load).toThrow('📈 Invalid variables data !');
});

