/* global it, expect, jest, afterEach */
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
  const result = snitchy.page();

  expect(result).toBeNull();
});

it('has no defaults', () => {
  const variables = {
    pages: {},
    components: {},
  };

  snitchy.load(variables);

  function page() { // eslint-disable-line require-jsdoc
    snitchy.page();
  }

  expect(page).toThrow('Expected argument "layer" to be of type `string` or `array`');
  expect(snitchy.values).toBeUndefined();
  expect(snitchy.scope).toBeUndefined();
});

it('throws error on invalid layer', () => {
  const variables = {
    pages: {},
    components: {},
  };

  snitchy.load(variables);

  function page() { // eslint-disable-line require-jsdoc
    snitchy.page({});
  }

  expect(page).toThrow('Expected argument "layer" to be of type `string` or `array`');
});

it('displays warning when missing layer', () => {
  global.console = {
    ...global.console,
    warn: jest.fn(),
  };
  const variables = {
    pages: {
      all: {
        otherLayer: {},
      },
    },
    components: {},
  };

  snitchy.load(variables);
  const result = snitchy.page('layer');

  expect(result).toBeNull();
  expect(global.console.warn).toHaveBeenCalled();
});

it('pushes one single layer', () => {
  const expected = {
    layer1: {
      static: 'value',
    },
  };
  const variables = {
    pages: {
      all: {
        layer1: {
          static: 'value',
        },
      },
    },
    components: {},
  };

  snitchy.load(variables);

  const result = snitchy.page('layer1');

  pushed += 1;

  expect(result).toMatchObject(expected);
  // DEV
  // expect(dataLayer.push).toHaveBeenCalledTimes(pushed);
});

it('pushes multiple layers', () => {
  const expected = {
    layer1: {
      static: 'value',
    },
    layer2: {
      static: 'value',
    },
  };
  const variables = {
    pages: {
      all: {
        layer1: {
          static: 'value',
        },
        layer2: {
          static: 'value',
        },
      },
    },
    components: {},
  };

  snitchy.load(variables);

  const result = snitchy.page(['layer1', 'layer2']);

  pushed += 1;

  expect(result).toMatchObject(expected);
  // DEV
  // expect(dataLayer.push).toHaveBeenCalledTimes(pushed);
});

it('pushes only global [all] layer', () => {
  const expected = {
    layer: {
      staticAll: 'value',
    },
  };
  const variables = {
    pages: {
      all: {
        layer: {
          staticAll: 'value',
        },
      },
      namespace: {
        layer: {
          staticNamespace: 'value',
        },
      },
    },
    components: {},
  };

  snitchy.load(variables);

  const result = snitchy.page('layer');

  pushed += 1;

  expect(result).toMatchObject(expected);
  // DEV
  // expect(dataLayer.push).toHaveBeenCalledTimes(pushed);
});

it('pushes only custom [namespace] layers', () => {
  const expected = {
    layer: {
      staticNamespace: 'value',
    },
  };
  const variables = {
    pages: {
      home: {
        layer: {
          staticNamespace: 'value',
        },
      },
    },
    components: {},
  };

  document.body.dataset.snitchyPage = 'home';
  snitchy.load(variables);

  const result = snitchy.page('layer');

  pushed += 1;

  expect(result).toMatchObject(expected);
  // DEV
  // expect(dataLayer.push).toHaveBeenCalledTimes(pushed);
});

it('pushes global and custom layers', () => {
  const expected = {
    layer: {
      staticAll: 'value',
      staticNamespace: 'value',
    },
  };
  const variables = {
    pages: {
      all: {
        layer: {
          staticAll: 'value',
        },
      },
      home: {
        layer: {
          staticNamespace: 'value',
        },
      },
    },
    components: {},
  };

  document.body.dataset.snitchyPage = 'home';
  snitchy.load(variables);

  const result = snitchy.page('layer');

  pushed += 1;

  expect(result).toMatchObject(expected);
  // DEV
  // expect(dataLayer.push).toHaveBeenCalledTimes(pushed);
});


it('pushes overridendata-namespace', () => {
  const expected = {
    layer: {
      staticNamespace: 'value3',
    },
  };
  const variables = {
    pages: {
      all: {
        layer: {
          staticNamespace: 'value1',
        },
      },
      home: {
        layer: {
          staticNamespace: 'value2',
        },
      },
      overriden: {
        layer: {
          staticNamespace: 'value3',
        },
      },
    },
    components: {},
  };

  document.body.dataset.snitchyPage = 'home';
  snitchy.load(variables);

  const result = snitchy.page('layer', null, null, 'overriden');

  pushed += 1;

  expect(result).toMatchObject(expected);
  // DEV
  // expect(dataLayer.push).toHaveBeenCalledTimes(pushed);
});
