/* global it, expect */
import parser from '../src/parser.js';
import rules from 'rules';

parser.init(rules);

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

// Errors
it('throws error for missing value', () => {
  expect(() => {
    parser.parse('$data');
  }).toThrow('Invalid param/value');
});

// Null
// it('returns null for missing value', () => {
//   expect(parser.parse('$data')).toBeNull();
// });
