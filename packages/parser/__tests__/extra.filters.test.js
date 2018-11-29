/* global it, expect */
import parser from '../src/parser.js';
import rules from 'rules';

parser.init(rules);

it('parses filter', () => {
  const result = parser.parse('$elText|filter');

  expect(result).toHaveProperty('filters', ['filter']);
});

it('parses method filter', () => {
  const result = parser.parse('$elText|filter("-")');

  expect(result).toHaveProperty('filters', ['filter("-")']);
});

it('parses multiple filters', () => {
  const result = parser.parse('$elText|filter1|filter2');

  expect(result).toHaveProperty('filters', ['filter1', 'filter2']);
});

it('parses multiple method filters', () => {
  const result = parser.parse('$elText|filter1("arg")|filter2("arg")');

  expect(result).toHaveProperty('filters', ['filter1("arg")', 'filter2("arg")']);
});
