/* global it, expect */
import Parser from '../src/Parser.js';
import rules from 'rules';

const parser = new Parser(rules);

it('parses "this" param', () => {
  const result = parser.parse('$thisValue');

  expect(result).toHaveProperty('param', 'this');
  expect(result).toHaveProperty('value', 'value');
});

// DEV
// it('throws invalid value for missing value', () => {
//   expect(() => {
//     parser.parse('$this');
//   }).toThrow('Invalid value');
// });

// it('throws invalid value for unauthorized "el" element', () => {
//   expect(() => {
//     parser.parse('$elThisValue');
//   }).toThrow('Invalid value');
// });

// it('throws invalid value for unauthorized "ref" element', () => {
//   expect(() => {
//     parser.parse('$refNameThisValue');
//   }).toThrow('Invalid value');
// });
it('returns null for missing value', () => {
  expect(parser.parse('$this')).toBeNull();
});

it('returns null for unauthorized "el" element', () => {
  expect(parser.parse('$elThisValue')).toBeNull();
});

it('returns null for unauthorized "ref" element', () => {
  expect(parser.parse('$refNameThisValue')).toBeNull();
});
