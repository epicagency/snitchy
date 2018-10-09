/* global it, expect */
import Parser from '../src/Parser.js';
import rules from 'rules';

const parser = new Parser(rules);

it('parses filter', () => {
  const result = parser.parse('$elText|filter');

  expect(result).toHaveProperty('filters', ['filter']);
});

it('parses multiple filters', () => {
  const result = parser.parse('$elText|filter1|filter2');

  expect(result).toHaveProperty('filters', ['filter1', 'filter2']);
});
