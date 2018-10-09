/* global it, expect */
import Parser from '../src/Parser.js';
import rules from 'rules';

const parser = new Parser(rules);

it('parses "text" param with "el" element', () => {
  const result = parser.parse('$elText');

  expect(result).toHaveProperty('param', 'text');
});

it('parses "text" param with "ref" element', () => {
  const result = parser.parse('$refFooText');

  expect(result).toHaveProperty('param', 'text');
});

// DEV
// it('throws invalid value for missing element', () => {
//   expect(() => {
//     parser.parse('$text');
//   }).toThrow('Invalid value');
// });

// it('throws invalid value for excess value', () => {
//   expect(() => {
//     parser.parse('$elTextValue');
//   }).toThrow('Invalid value');
// });
it('returns null for missing element', () => {
  expect(parser.parse('$text')).toBeNull();
});

it('returns null for excess value', () => {
  expect(parser.parse('$elTextValue')).toBeNull();
});
