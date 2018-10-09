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

it('pushes one single layer', () => {
  const expected = [{
    static: 'value',
  }];
  const variables = {
    pages: {},
    events: {
      name: {
        layer: {
          static: 'value',
        },
      },
    },
  };

  snitchy.load(variables);

  const result = snitchy.event('name');

  expect(result).toStrictEqual(expected);
  expect(dataLayer.push).toHaveBeenCalledTimes(1);
});

it('pushes multiple layers', () => {
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
    events: {
      name: {
        layer1: {
          static: 'value',
        },
        layer2: {
          static: 'value',
        },
      },
    },
  };

  snitchy.load(variables);

  const result = snitchy.event('name');

  expect(result).toStrictEqual(expected);
  expect(dataLayer.push).toHaveBeenCalledTimes(2);
});

it('pushes only trigger', () => {
  const expected = [
    {
      static: 'value',
    },
  ];
  const variables = {
    pages: {},
    events: {
      name: {
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

  const result = snitchy.event('name', null, null, 'click');

  expect(result).toStrictEqual(expected);
  expect(dataLayer.push).toHaveBeenCalledTimes(1);
});
