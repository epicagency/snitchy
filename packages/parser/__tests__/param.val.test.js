/* global it, expect */
import parser from '../src/parser.js';
import rules from 'rules';

parser.init(rules);

it('parses "val" param', () => {
  const result = parser.parse('$valValue');

  expect(result).toHaveProperty('param', 'val');
  expect(result).toHaveProperty('value', 'value');
});

// Errors
it('throws error for missing value', () => {
  expect(() => {
    parser.parse('$val');
  }).toThrow('Invalid param/value');
});

it('throws error for unauthorized "el" element', () => {
  expect(() => {
    parser.parse('$elValValue');
  }).toThrow('Param [val] do not accept element [el]');
});

it('throws error for unauthorized "ref" element', () => {
  expect(() => {
    parser.parse('$refNameValValue');
  }).toThrow('Param [val] do not accept element [ref]');
});

// Null
// it('returns null for missing value', () => {
//   expect(parser.parse('$val')).toBeNull();
// });

// it('returns null for unauthorized "el" element', () => {
//   expect(parser.parse('$elValValue')).toBeNull();
// });

// it('returns null for unauthorized "ref" element', () => {
//   expect(parser.parse('$refNameValValue')).toBeNull();
// });
