/* global it, expect */
import Parser from '../src/Parser.js';
import rules from 'rules';

const parser = new Parser(rules);

it('parses "data" param with simple value', () => {
  const result = parser.parse('$dataValue');

  expect(result).toHaveProperty('param', 'data');
  expect(result).toHaveProperty('value', 'value');
});

it('parses "data" param with compound value', () => {
  const result = parser.parse('$dataCompoundValue');

  expect(result).toHaveProperty('param', 'data');
  expect(result).toHaveProperty('value', 'compoundValue');
});

it('parses "data" param with ambiguous value', () => {
  const result = parser.parse('$dataText');

  expect(result).toHaveProperty('param', 'data');
  expect(result).toHaveProperty('value', 'text');
});

it('parses "data" param with "el" element', () => {
  const result = parser.parse('$elDataValue');

  expect(result).toHaveProperty('param', 'data');
  expect(result).toHaveProperty('value', 'value');
});

it('parses "data" param with "ref" element', () => {
  const result = parser.parse('$refNameDataValue');

  expect(result).toHaveProperty('param', 'data');
  expect(result).toHaveProperty('value', 'value');
});

// DEV
// it('throws invalid value for missing value', () => {
//   expect(() => {
//     parser.parse('$data');
//   }).toThrow('Invalid value');
// });
it('returns null for missing value', () => {
  expect(parser.parse('$data')).toBeNull();
});
