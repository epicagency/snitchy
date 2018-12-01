/* global it, expect */
import {
  qs,
} from '../src/index.js';

const el = document.createElement('div');

document.body.appendChild(el);

it('get element with no context', () => {
  const result = qs('div');

  expect(result).toBe(el);
});

it('get element with context', () => {
  const result = qs('div', document.body);

  expect(result).toBe(el);
});
