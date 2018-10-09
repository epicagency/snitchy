/* global it, expect, afterEach */
import snitchy from '../src';

afterEach(() => {
  const el = document.body;

  while (el.attributes.length > 0) {
    el.removeAttribute(el.attributes[0].name);
  }

  document.body.innerHTML = '';
  window.dataLayer = undefined;
});

it('returns "null" if no variables', () => {
  const result = snitchy.page();

  expect(result).toBeNull();
});

it('sets one single layer', () => {
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
    events: {},
  };

  snitchy.load(variables);

  const result = snitchy.page('layer1');

  expect(result).toStrictEqual(expected);
  expect([result]).toStrictEqual(window.dataLayer);
});

it('sets multiple layers', () => {
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
    events: {},
  };

  snitchy.load(variables);

  const result = snitchy.page(['layer1', 'layer2']);

  expect(result).toStrictEqual(expected);
  expect([result]).toStrictEqual(window.dataLayer);
});

it('sets only global [all] layer', () => {
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
    events: {},
  };

  snitchy.load(variables);

  const result = snitchy.page('layer');

  expect(result).toStrictEqual(expected);
  expect([result]).toStrictEqual(window.dataLayer);
});

it('sets only custom [namespace] layers', () => {
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
    events: {},
  };

  document.body.dataset.snitchyPage = 'home';
  snitchy.load(variables);

  const result = snitchy.page('layer');

  expect(result).toStrictEqual(expected);
  expect([result]).toStrictEqual(window.dataLayer);
});

it('sets global and custom layers', () => {
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
    events: {},
  };

  document.body.dataset.snitchyPage = 'home';
  snitchy.load(variables);

  const result = snitchy.page('layer');

  expect(result).toStrictEqual(expected);
  expect([result]).toStrictEqual(window.dataLayer);
});


it('sets overriden data-namespace', () => {
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
    events: {},
  };

  document.body.dataset.snitchyPage = 'home';
  snitchy.load(variables);

  const result = snitchy.page('layer', null, null, 'overriden');

  expect(result).toStrictEqual(expected);
  expect([result]).toStrictEqual(window.dataLayer);
});
