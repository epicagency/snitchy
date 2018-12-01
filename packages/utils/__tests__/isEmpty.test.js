/* global it, expect */
import {
  isEmpty,
} from '../src/index.js';

it('checks empty object', () => {
  const result = isEmpty({});

  expect(result).toBeTruthy();
});

it('checks no empty object', () => {
  const result = isEmpty({ foo: 'foo' });

  expect(result).toBeFalsy();
});

