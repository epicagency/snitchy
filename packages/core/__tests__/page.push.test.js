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

it('pushes with default name, layer, event', () => {
  // Defaults: all, page, page-load
  const expected = [{
    event: 'page-load',
    page: {
      static: 'value',
    },
  }];
  const variables = {
    pages: {
      all: {
        page: [{
          event: 'page-load',
          data: {
            static: 'value',
          },
        }],
      },
    },
    events: {},
  };

  snitchy.load(variables);

  const result = snitchy.page();

  expect(result).toStrictEqual(expected);
  expect(dataLayer.push).toHaveBeenCalledTimes(1);
});

it('pushes with "name"', () => {
  const expected = [{
    event: 'page-load',
    page: {
      static: 'value',
    },
  }];
  const variables = {
    pages: {
      name: {
        page: [{
          event: 'page-load',
          data: {
            static: 'value',
          },
        }],
      },
    },
    events: {},
  };

  snitchy.load(variables);

  const result = snitchy.page('name');

  expect(result).toStrictEqual(expected);
  expect(dataLayer.push).toHaveBeenCalledTimes(1);
});

it('pushes with "layer"', () => {
  const expected = [{
    event: 'page-load',
    layer: {
      static: 'value',
    },
  }];
  const variables = {
    pages: {
      all: {
        layer: [{
          event: 'page-load',
          data: {
            static: 'value',
          },
        }],
      },
    },
    events: {},
  };

  snitchy.load(variables);

  const result = snitchy.page('all', { layer: 'layer' });

  expect(result).toStrictEqual(expected);
  expect(dataLayer.push).toHaveBeenCalledTimes(1);
});

it('pushes with "event"', () => {
  const expected = [{
    event: 'event',
    page: {
      static: 'value',
    },
  }];
  const variables = {
    pages: {
      all: {
        page: [{
          event: 'event',
          data: {
            static: 'value',
          },
        }],
      },
    },
    events: {},
  };

  snitchy.load(variables);

  const result = snitchy.page('all', {
    layer: 'page',
    event: 'event',
  });

  expect(result).toStrictEqual(expected);
  expect(dataLayer.push).toHaveBeenCalledTimes(1);
});

it('pushes with multiple [layer]', () => {
  const expected = [
    {
      event: 'page-load',
      layer1: {
        static: 'value',
      },
    },
    {
      event: 'page-load',
      layer2: {
        static: 'value',
      },
    },
  ];
  const variables = {
    pages: {
      all: {
        layer1: [{
          event: 'page-load',
          data: {
            static: 'value',
          },
        }],
        layer2: [{
          event: 'page-load',
          data: {
            static: 'value',
          },
        }],
      },
    },
    events: {},
  };

  snitchy.load(variables);

  const result = snitchy.page('all', { layer: ['layer1', 'layer2'] });

  expect(result).toStrictEqual(expected);
  expect(dataLayer.push).toHaveBeenCalledTimes(2);
});

it('pushes with multiple [event]', () => {
  const expected = [
    {
      event: 'event1',
      page: {
        static: 'value',
      },
    },
    {
      event: 'event2',
      page: {
        static: 'value',
      },
    },
  ];
  const variables = {
    pages: {
      all: {
        page: [
          {
            event: 'event1',
            data: {
              static: 'value',
            },
          },
          {
            event: 'event2',
            data: {
              static: 'value',
            },
          },
        ],
      },
    },
    events: {},
  };

  snitchy.load(variables);

  const result = snitchy.page('all', {
    layer: 'page',
    event: ['event1', 'event2'],
  });

  expect(result).toStrictEqual(expected);
  expect(dataLayer.push).toHaveBeenCalledTimes(2);
});

it('pushes with multiple [layer] and [event]', () => {
  const expected = [
    {
      event: 'event1',
      layer1: {
        static: 'value',
      },
    },
    {
      event: 'event2',
      layer1: {
        static: 'value',
      },
    },
    {
      event: 'event1',
      layer2: {
        static: 'value',
      },
    },
    {
      event: 'event2',
      layer2: {
        static: 'value',
      },
    },
  ];
  const variables = {
    pages: {
      all: {
        layer1: [
          {
            event: 'event1',
            data: {
              static: 'value',
            },
          },
          {
            event: 'event2',
            data: {
              static: 'value',
            },
          },
        ],
        layer2: [
          {
            event: 'event1',
            data: {
              static: 'value',
            },
          },
          {
            event: 'event2',
            data: {
              static: 'value',
            },
          },
        ],
      },
    },
    events: {},
  };

  snitchy.load(variables);

  const result = snitchy.page('all', {
    layer: ['layer1', 'layer2'],
    event: ['event1', 'event2'],
  });

  expect(result).toStrictEqual(expected);
  expect(dataLayer.push).toHaveBeenCalledTimes(4);
});

it('pushes with "all" and "name"', () => {
  const expected = [{
    event: 'page-load',
    page: {
      static: 'value',
      static2: 'value',
    },
  }];
  const variables = {
    pages: {
      all: {
        page: [{
          event: 'page-load',
          data: {
            static: 'value',
          },
        }],
      },
      name: {
        page: [{
          event: 'page-load',
          data: {
            static2: 'value',
          },
        }],
      },
    },
    events: {},
  };

  snitchy.load(variables);

  const result = snitchy.page('name');

  expect(result).toStrictEqual(expected);
  expect(dataLayer.push).toHaveBeenCalledTimes(1);
});

it('pushes with "all" and "name" merged', () => {
  const expected = [{
    event: 'page-load',
    page: {
      static: 'value2',
    },
  }];
  const variables = {
    pages: {
      all: {
        page: [{
          event: 'page-load',
          data: {
            static: 'value',
          },
        }],
      },
      name: {
        page: [{
          event: 'page-load',
          data: {
            static: 'value2',
          },
        }],
      },
    },
    events: {},
  };

  snitchy.load(variables);

  const result = snitchy.page('name');

  expect(result).toStrictEqual(expected);
  expect(dataLayer.push).toHaveBeenCalledTimes(1);
});

it('pushes with [data-snitchy-name]', () => {
  const expected = [{
    event: 'page-load',
    page: {
      static: 'value',
    },
  }];
  const variables = {
    pages: {
      name: {
        page: [{
          event: 'page-load',
          data: {
            static: 'value',
          },
        }],
      },
    },
    events: {},
  };

  document.body.dataset.snitchyPage = 'name';
  snitchy.load(variables);

  const result = snitchy.page();

  expect(result).toStrictEqual(expected);
  expect(dataLayer.push).toHaveBeenCalledTimes(1);
});

it('pushes with "all" and [data-snitchy-name]', () => {
  const expected = [{
    event: 'page-load',
    page: {
      static: 'value',
      static2: 'value',
    },
  }];
  const variables = {
    pages: {
      all: {
        page: [{
          event: 'page-load',
          data: {
            static: 'value',
          },
        }],
      },
      name: {
        page: [{
          event: 'page-load',
          data: {
            static2: 'value',
          },
        }],
      },
    },
    events: {},
  };

  document.body.dataset.snitchyPage = 'name';
  snitchy.load(variables);

  const result = snitchy.page('name');

  expect(result).toStrictEqual(expected);
  expect(dataLayer.push).toHaveBeenCalledTimes(1);
});

it('pushes with "all" and [data-snitchy-name] merged', () => {
  const expected = [{
    event: 'page-load',
    page: {
      static: 'value2',
    },
  }];
  const variables = {
    pages: {
      all: {
        page: [{
          event: 'page-load',
          data: {
            static: 'value',
          },
        }],
      },
      name: {
        page: [{
          event: 'page-load',
          data: {
            static: 'value2',
          },
        }],
      },
    },
    events: {},
  };

  document.body.dataset.snitchyPage = 'name';
  snitchy.load(variables);

  const result = snitchy.page('name');

  expect(result).toStrictEqual(expected);
  expect(dataLayer.push).toHaveBeenCalledTimes(1);
});
