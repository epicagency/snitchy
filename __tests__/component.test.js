/* global it, expect, afterEach */
import snitchy from '../src';
import dataLayer from 'dataLayer';

afterEach(() => {
  const el = document.body;

  while (el.attributes.length > 0) {
    el.removeAttribute(el.attributes[0].name);
  }

  document.body.innerHTML = '';
});

let pushed = 0;

it('returns "null" if no variables', () => {
  const result = snitchy.component();

  expect(result).toBeNull();
});

it('has no defaults', () => {
  const variables = {
    pages: {},
    components: {},
  };

  snitchy.load(variables);

  function component() { // eslint-disable-line require-jsdoc
    snitchy.component({});
  }

  expect(component).toThrow('Expected argument to be of type `string`');
  expect(snitchy.values).toBeUndefined();
  expect(snitchy.scope).toBeUndefined();
});

it('throws error on invalid slug', () => {
  const variables = {
    pages: {},
    components: {},
  };

  snitchy.load(variables);

  function component() { // eslint-disable-line require-jsdoc
    snitchy.component({});
  }

  expect(component).toThrow('Expected argument to be of type `string`');
});

it('returns "null" if no slug', () => {
  const variables = {
    pages: {},
    components: {},
  };

  snitchy.load(variables);
  const result = snitchy.component('slug');

  expect(result).toBeNull();
});

it('pushes one single variable', () => {
  const expected = [{
    static: 'value',
  }];
  const variables = {
    pages: {},
    components: {
      slug: {
        single: {
          static: 'value',
        },
      },
    },
  };

  snitchy.load(variables);

  const result = snitchy.component('slug');

  pushed += 1;

  expect(result).toMatchObject(expected);
  expect(dataLayer.push).toHaveBeenCalledTimes(pushed);
});

it('pushes multiple variables', () => {
  const expected = [
    {
      static: 'value',
    },
    {
      static: 'value',
    },
  ];
  const variables = {
    pages: {},
    components: {
      slug: {
        first: {
          static: 'value',
        },
        second: {
          static: 'value',
        },
      },
    },
  };

  snitchy.load(variables);

  const result = snitchy.component('slug');

  pushed += 2;

  expect(result).toMatchObject(expected);
  expect(dataLayer.push).toHaveBeenCalledTimes(pushed);
});

it('pushes only trigger', () => {
  const expected = [
    {
      static: 'value',
    },
  ];
  const variables = {
    pages: {},
    components: {
      slug: {
        with: {
          trigger: 'click',
          static: 'value',
        },
        without: {
          static: 'value',
        },
      },
    },
  };

  snitchy.load(variables);

  const result = snitchy.component('slug', null, null, 'click');

  pushed += 1;

  expect(result).toMatchObject(expected);
  expect(dataLayer.push).toHaveBeenCalledTimes(pushed);
});
