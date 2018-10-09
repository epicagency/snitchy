/* global it, expect */
import Parser from '../src/Parser.js';
import rules from 'rules';

const parser = new Parser(rules);

it('parses "doc" param', () => {
  const result = parser.parse('$docValue');

  expect(result).toHaveProperty('param', 'doc');
  expect(result).toHaveProperty('value', 'value');
});

// DEV
// it('throws invalid value for missing value', () => {
//   expect(() => {
//     parser.parse('$doc');
//   }).toThrow('Invalid value');
// });

// it('throws invalid value for unauthorized "el" element', () => {
//   expect(() => {
//     parser.parse('$elDocValue');
//   }).toThrow('Invalid value');
// });

// it('throws invalid value for unauthorized "ref" element', () => {
//   expect(() => {
//     parser.parse('$refNameDocValue');
//   }).toThrow('Invalid value');
// });

it('returns null for missing value', () => {
  expect(parser.parse('$doc')).toBeNull();
});

it('returns null for unauthorized "el" element', () => {
  expect(parser.parse('$elDocValue')).toBeNull();
});

it('returns null for unauthorized "ref" element', () => {
  expect(parser.parse('$refNameDocValue')).toBeNull();
});
