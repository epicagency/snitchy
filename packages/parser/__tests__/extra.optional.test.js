/* global it, expect */
import parser from '../src/parser.js';
import rules from 'rules';

parser.init(rules);

it('parses optional flag', () => {
  const result = parser.parse('$elText?');

  expect(result).toHaveProperty('optional', true);
});

it('parses optional flag with filter', () => {
  const result = parser.parse('$elText|filter?');

  expect(result).toHaveProperty('optional', true);
});
