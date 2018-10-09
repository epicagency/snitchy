/* global it, expect */
import Parser from '../src/Parser.js';
import rules from 'rules';

const parser = new Parser(rules);

it('parses defaults value', () => {
  const result = parser.parse('$elText=default');

  expect(result).toHaveProperty('defaults', 'default');
});

it('parses defaults value whit filter', () => {
  const result = parser.parse('$elText|filter=default');

  expect(result).toHaveProperty('defaults', 'default');
});
