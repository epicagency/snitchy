/* global it, expect */
import parser from '../src/parser.js';
import rules from 'rules';

parser.init(rules);

it('parses "doc" param', () => {
  const result = parser.parse('$docValue');

  expect(result).toHaveProperty('param', 'doc');
  expect(result).toHaveProperty('value', 'value');
});

// Errors
it('throws error for missing value', () => {
  expect(() => {
    parser.parse('$doc');
  }).toThrow('Invalid param/value');
});

it('throws error for unauthorized "el" element', () => {
  expect(() => {
    parser.parse('$elDocValue');
  }).toThrow('Param [doc] do not accept element [el]');
});

it('throws error for unauthorized "ref" element', () => {
  expect(() => {
    parser.parse('$refNameDocValue');
  }).toThrow('Param [doc] do not accept element [ref]');
});

// Null
// it('returns null for missing value', () => {
//   expect(parser.parse('$doc')).toBeNull();
// });

// it('returns null for unauthorized "el" element', () => {
//   expect(parser.parse('$elDocValue')).toBeNull();
// });

// it('returns null for unauthorized "ref" element', () => {
//   expect(parser.parse('$refNameDocValue')).toBeNull();
// });
