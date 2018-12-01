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

it('pushes with "name", "layer", "event"', () => {
  const expected = [{
    event: 'event',
    static: 'value',
  }];
  const variables = {
    pages: {},
    events: {
      name: {
        layer: [{
          event: 'event',
          data: {
            static: 'value',
          },
        }],
      },
    },
  };

  snitchy.load(variables);

  let result = snitchy.event('name', {
    layer: 'layer',
    event: 'event',
  });

  expect(result).toStrictEqual(expected);
  expect(dataLayer.push).toHaveBeenCalledTimes(1);

  result = snitchy.event('name', {
    event: 'event',
  });

  expect(result).toStrictEqual(expected);
  expect(dataLayer.push).toHaveBeenCalledTimes(2);

  result = snitchy.event('name', {
    layer: 'layer',
  });

  expect(result).toStrictEqual(expected);
  expect(dataLayer.push).toHaveBeenCalledTimes(3);

  result = snitchy.event('name');

  expect(result).toStrictEqual(expected);
  expect(dataLayer.push).toHaveBeenCalledTimes(4);
});

it('pushes with specific "layer"/"event"', () => {
  const expected = [{
    event: 'event1',
    static: 'value1',
  }];
  const variables = {
    pages: {},
    events: {
      name: {
        layer1: [{
          event: 'event1',
          data: {
            static: 'value1',
          },
        }],
        layer2: [{
          event: 'event2',
          data: {
            static: 'value2',
          },
        }],
      },
    },
  };

  snitchy.load(variables);

  let result = snitchy.event('name', {
    layer: 'layer1',
  });

  expect(result).toStrictEqual(expected);
  expect(dataLayer.push).toHaveBeenCalledTimes(1);

  result = snitchy.event('name', {
    event: 'event1',
  });

  expect(result).toStrictEqual(expected);
  expect(dataLayer.push).toHaveBeenCalledTimes(2);
});

it('pushes with multiple [layer]', () => {
  const expected = [
    {
      event: 'event1',
      static: 'value1',
    },
    {
      event: 'event2',
      static: 'value2',
    },
  ];
  const variables = {
    pages: {},
    events: {
      name: {
        layer1: [{
          event: 'event1',
          data: {
            static: 'value1',
          },
        }],
        layer2: [{
          event: 'event2',
          data: {
            static: 'value2',
          },
        }],
      },
    },
  };

  snitchy.load(variables);

  const result = snitchy.event('name', {
    layer: ['layer1', 'layer2'],
  });

  expect(result).toStrictEqual(expected);
  expect(dataLayer.push).toHaveBeenCalledTimes(2);
});

it('pushes with multiple [event]', () => {
  const expected = [
    {
      event: 'event1',
      static: 'value1',
    },
    {
      event: 'event2',
      static: 'value2',
    },
  ];
  const variables = {
    pages: {},
    events: {
      name: {
        layer1: [
          {
            event: 'event1',
            data: {
              static: 'value1',
            },
          },
          {
            event: 'event2',
            data: {
              static: 'value2',
            },
          },
        ],
      },
    },
  };

  snitchy.load(variables);

  const result = snitchy.event('name', {
    event: ['event1', 'event2'],
  });

  expect(result).toStrictEqual(expected);
  expect(dataLayer.push).toHaveBeenCalledTimes(2);
});
it('pushes with "trigger"', () => {
  const expected = [{
    event: 'event',
    static: 'value',
  }];
  const variables = {
    pages: {},
    events: {
      name: {
        layer: [{
          event: 'event',
          data: {
            trigger: 'trigger',
            static: 'value',
          },
        }],
      },
    },
  };

  snitchy.load(variables);

  const result = snitchy.event('name', {
    trigger: 'trigger',
  });

  expect(result).toStrictEqual(expected);
  expect(dataLayer.push).toHaveBeenCalledTimes(1);
});
