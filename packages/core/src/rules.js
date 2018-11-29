import {
  kebabcase,
  lcfirst,
} from '@snitchy/utils';

/**
 * Rules
 *
 * Key = rule name
 * @param {string="element", "param"} type element refers to DOM element
 * @param {boolean|undefined} [useElement] PARAM can be explicitly combined (or not, or both) with an element
 * @param {boolean|undefined} [useValue] PARAM can explicitly (or not, or both) use a value
 * @param {boolean|undefined} [useName] ELEMENT explicitly (or not, or both) use a name
 * @param {string} [useExtra] optional "extra" information
 */
/* eslint-disable object-property-newline, no-multi-spaces */
export default {
  // Params
  attr: {
    pattern: { type: 'param', useValue: true },
    format: value => kebabcase(lcfirst(value)),
    getters: value => [{
      type: 'method',
      name: 'getAttribute',
      value,
    }],
  },
  data: {
    pattern: { type: 'param', useValue: true},
    format: value => `data-${kebabcase(lcfirst(value))}`,
    getters: value => [{
      type: 'method',
      name: 'getAttribute',
      value,
    }],
  },
  doc: {
    pattern: { type: 'param', useElement: false, useValue: true },
    root: () => document,
    getters: value => [{
      type: 'property',
      name: value,
    }],
  },
  html: {
    pattern: { type: 'param', useElement: true, useValue: false },
    getters: () => [{
      type: 'property',
      name: 'innerHTML',
    }],
  },
  text: {
    pattern: { type: 'param', useElement: true, useValue: false },
    getters: () => [{
      type: 'property',
      name: 'textContent',
    }],
  },
  this: {
    pattern: { type: 'param', useElement: false, useValue: true },
    root: context => context.scope,
    getters: value => [{
      type: 'property',
      name: value,
    }],
  },
  url: {
    pattern: { type: 'param', useElement: false, useExtra: 'search,hash' },
    root: () => window.location,
    getters: (value, extra) => {
      const getters = [{
        type: 'property',
        name: extra || value || 'href',
      }];

      if (value === 'hash' || extra === 'hash') {
        getters.push({
          type: 'method',
          name: 'replace',
          value: [/^#/, ''],
        });
      }
      if (extra === 'search' && value) {
        getters.push({
          type: 'method',
          name: 'match',
          value: new RegExp(`\A?${value}=(?<r>[^&]+)&*`), // eslint-disable-line no-useless-escape
        });
        getters.push({
          type: 'property',
          name: 1,
        });
      }

      return getters;
    },
  },
  val: {
    pattern: { type: 'param', useElement: false, useValue: true },
    root: context => context.values,
    getters: value => [{
      type: 'property',
      name: value,
    }],
  },
  // Elements
  el: {
    pattern: { type: 'element', useName: false, useParam: true },
    root: context => context.scope.$el,
    // From kapla-plugin
    // const attr = key;
    // const htmlAttr = kebabcase(key);

    // return scope.$el.attr || scope.$el.getAttribute(htmlAttr) || trim(scope.$el[attr]);
  },
  ref: {
    pattern: { type: 'element', useName: true, useParam: true },
    root: (context, name) => context.scope.$refs[name],
  },
};
