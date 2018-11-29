/* global it, expect */
import parser from '../src/parser.js';
import rules from 'rules';

parser.init(rules);

it('parses "attr" param with simple value', () => {
  const result = parser.parse('$attrValue');

  expect(result).toHaveProperty('param', 'attr');
  expect(result).toHaveProperty('value', 'value');
});

it('parses "attr" param with compound value', () => {
  const result = parser.parse('$attrCompoundValue');

  expect(result).toHaveProperty('param', 'attr');
  expect(result).toHaveProperty('value', 'compoundValue');
});

it('parses "attr" param with ambiguous value', () => {
  const result = parser.parse('$attrText');

  expect(result).toHaveProperty('param', 'attr');
  expect(result).toHaveProperty('value', 'text');
});

it('parses "attr" param with "el" element', () => {
  const result = parser.parse('$elAttrValue');

  expect(result).toHaveProperty('param', 'attr');
  expect(result).toHaveProperty('value', 'value');
});

it('parses "attr" param with "ref" element', () => {
  const result = parser.parse('$refNameAttrValue');

  expect(result).toHaveProperty('param', 'attr');
  expect(result).toHaveProperty('value', 'value');
});

// Errors
it('throws error for missing value', () => {
  expect(() => {
    parser.parse('$attr');
  }).toThrow('Invalid param/value');
});

// Null
// it('returns null for missing value', () => {
//   expect(parser.parse('$attr')).toBeNull();
// });
