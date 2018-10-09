/* global it, expect */
import Parser from '../src/Parser.js';
import rules from 'rules';

const parser = new Parser(rules);

it('parses optional flag', () => {
  const result = parser.parse('$elText?');

  expect(result).toHaveProperty('optional', true);
});

it('parses optional flag with filter', () => {
  const result = parser.parse('$elText|filter?');

  expect(result).toHaveProperty('optional', true);
});
