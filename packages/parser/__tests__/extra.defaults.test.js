/* global it, expect */
import parser from '../src/parser.js';
import rules from 'rules';

parser.init(rules);

it('parses defaults value', () => {
  const result = parser.parse('$elText=default');

  expect(result).toHaveProperty('defaults', 'default');
});

it('parses defaults value whit filter', () => {
  const result = parser.parse('$elText|filter=default');

  expect(result).toHaveProperty('defaults', 'default');
});
