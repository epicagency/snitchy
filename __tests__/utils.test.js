/* global it, expect, jest */
import { utils } from '../src';

it('kebabcases strings', () => {
  const value = utils.kebabCase('testMe');

  expect(value).toBe('test-me');
});

it('camelcases strings', () => {
  const value = utils.camelCase('test-me');

  expect(value).toBe('testMe');
});

it('loops on array', () => {
  const arr = ['foo', 'bar'];
  const newArr = [];
  const value = utils.forEach(arr, el => {
    newArr.push(el);
  });

  expect(value).toMatchObject(arr);
  expect(value).toMatchObject(newArr);
});

it('iterates on array', () => {
  const arr = ['foo', 'bar'];
  const iteratee = jest.fn();

  utils.forEach(arr, iteratee);

  expect(iteratee).toHaveBeenCalledTimes(2);
});

it('loops on object', () => {
  const obj = {
    foo: 'foo',
    bar: 'bar',
  };
  const newObj = {};
  const value = utils.forEach(obj, (value, key) => {
    newObj[key] = value;
  });

  expect(value).toMatchObject(obj);
  expect(value).toMatchObject(newObj);
});

it('iterates on object', () => {
  const obj = {
    foo: 'foo',
    bar: 'bar',
  };
  const iteratee = jest.fn();

  utils.forEach(obj, iteratee);

  expect(iteratee).toHaveBeenCalledTimes(2);
});

it('selects element in document', () => {
  const div = document.createElement('div');

  document.body.appendChild(div);

  const el = utils.qs('div');

  expect(el instanceof HTMLElement).toBeTruthy();
  expect(el.nodeName).toBe('DIV');
});


it('selects element in element', () => {
  const div = document.createElement('div');

  document.body.appendChild(div);

  const el = utils.qs('div', document.body);

  expect(el instanceof HTMLElement).toBeTruthy();
  expect(el.nodeName).toBe('DIV');
});

it('throws error', () => {
  expect(utils.displayErrors).toThrow();
});

it('displays warning', () => {
  global.console = {
    ...global.console,
    warn: jest.fn(),
  };

  utils.displayWarnings('test');

  expect(global.console.warn).toHaveBeenCalled();
});
