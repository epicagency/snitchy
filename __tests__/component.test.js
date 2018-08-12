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

it('has no defaults', () => {
  const variables = {
    pages: {},
    components: {},
  };

  snitchy.load(variables);
  const result = snitchy.component();

  expect(result).toBeNull();
  expect(snitchy.values).toBeUndefined();
  expect(snitchy.scope).toBeUndefined();
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
/*
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
  expect(dataLayer.push).toHaveBeenCalledTimes(pushed);
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
  expect(dataLayer.push).toHaveBeenCalledTimes(pushed);
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

  document.body.dataset.namespace = 'home';
  snitchy.load(variables);

  const result = snitchy.page('layer');

  pushed += 1;

  expect(result).toMatchObject(expected);
  expect(dataLayer.push).toHaveBeenCalledTimes(pushed);
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

  document.body.dataset.namespace = 'home';
  snitchy.load(variables);

  const result = snitchy.page('layer');

  pushed += 1;

  expect(result).toMatchObject(expected);
  expect(dataLayer.push).toHaveBeenCalledTimes(pushed);
});
*/
