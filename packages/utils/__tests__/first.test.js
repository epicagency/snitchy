/* global it, expect */
import {
  lcfirst,
  ucfirst,
} from '../src/index.js';

it('converts first letter to lowercase', () => {
  const result = lcfirst('Ucfirst');

  expect(result).toBe('ucfirst');
});

it('converts first letter to uppercase', () => {
  const result = ucfirst('lcfirst');

  expect(result).toBe('Lcfirst');
});
