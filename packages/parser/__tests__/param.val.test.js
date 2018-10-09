/* global it, expect */
import Parser from '../src/Parser.js';
import rules from 'rules';

const parser = new Parser(rules);

it('parses "val" param', () => {
  const result = parser.parse('$valValue');

  expect(result).toHaveProperty('param', 'val');
  expect(result).toHaveProperty('value', 'value');
});

// DEV
// it('throws invalid value for missing value', () => {
//   expect(() => {
//     parser.parse('$val');
//   }).toThrow('Invalid value');
// });

// it('throws invalid value for unauthorized "el" element', () => {
//   expect(() => {
//     parser.parse('$elValValue');
//   }).toThrow('Invalid value');
// });

// it('throws invalid value for unauthorized "ref" element', () => {
//   expect(() => {
//     parser.parse('$refNameValValue');
//   }).toThrow('Invalid value');
// });
it('returns null for missing value', () => {
  expect(parser.parse('$val')).toBeNull();
});

it('returns null for unauthorized "el" element', () => {
  expect(parser.parse('$elValValue')).toBeNull();
});

it('returns null for unauthorized "ref" element', () => {
  expect(parser.parse('$refNameValValue')).toBeNull();
});
