/* global it, expect */
import {
  kebabcase,
  camelcase,
} from '../src/index.js';

it('converts camelCase to kebab-case', () => {
  const result = kebabcase('kebabCase');

  expect(result).toBe('kebab-case');
});

it('converts to kebab-case camelCase', () => {
  const result = camelcase('kebab-case');

  expect(result).toBe('kebabCase');
});
