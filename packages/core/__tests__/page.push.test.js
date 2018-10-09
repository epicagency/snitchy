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
  const expected = {
    event: 'page-load',
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
  expect(dataLayer.push).toHaveBeenCalledTimes(1);
});


it('pushes with event', () => {
  const expected = {
    event: 'event-name',
    layer1: {
      static: 'value',
    },
  };
  const variables = {
    pages: {
      all: {
        layer1: {
          event: 'event-name',
          static: 'value',
        },
      },
    },
    events: {},
  };

  snitchy.load(variables);

  const result = snitchy.page('layer1');

  expect(result).toStrictEqual(expected);
  expect(dataLayer.push).toHaveBeenCalledTimes(1);
});

it('pushes multiple layers', () => {
  const expected = {
    event: 'page-load',
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
  expect(dataLayer.push).toHaveBeenCalledTimes(1);
});

it('pushes only global [all] layer', () => {
  const expected = {
    event: 'page-load',
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
  expect(dataLayer.push).toHaveBeenCalledTimes(1);
});

it('pushes only custom [namespace] layers', () => {
  const expected = {
    event: 'page-load',
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
  expect(dataLayer.push).toHaveBeenCalledTimes(1);
});

it('pushes global and custom layers', () => {
  const expected = {
    event: 'page-load',
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
  expect(dataLayer.push).toHaveBeenCalledTimes(1);
});


it('pushes overriden data-namespace', () => {
  const expected = {
    event: 'page-load',
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
  expect(dataLayer.push).toHaveBeenCalledTimes(1);
});
