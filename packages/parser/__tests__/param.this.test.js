/* global it, expect */
import parser from '../src/parser.js';
import rules from 'rules';

parser.init(rules);

it('parses "this" param', () => {
  const result = parser.parse('$thisValue');

  expect(result).toHaveProperty('param', 'this');
  expect(result).toHaveProperty('value', 'value');
});

// Errors
it('throws error for missing value', () => {
  expect(() => {
    parser.parse('$this');
  }).toThrow('Invalid param/value');
});

it('throws error for unauthorized "el" element', () => {
  expect(() => {
    parser.parse('$elThisValue');
  }).toThrow('Param [this] do not accept element [el]');
});

it('throws error for unauthorized "ref" element', () => {
  expect(() => {
    parser.parse('$refNameThisValue');
  }).toThrow('Param [this] do not accept element [ref]');
});

// Null
// it('returns null for missing value', () => {
//   expect(parser.parse('$this')).toBeNull();
// });

// it('returns null for unauthorized "el" element', () => {
//   expect(parser.parse('$elThisValue')).toBeNull();
// });

// it('returns null for unauthorized "ref" element', () => {
//   expect(parser.parse('$refNameThisValue')).toBeNull();
// });
