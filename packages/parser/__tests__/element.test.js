/* global it, expect */
import parser from '../src/parser.js';
import rules from 'rules';

parser.init(rules);

it('parses "el" element', () => {
  const result = parser.parse('$elText');

  expect(result).toHaveProperty('element', 'el');
});

it('parses "ref" element with simple name', () => {
  const result = parser.parse('$refNameText');

  expect(result).toHaveProperty('element', 'ref');
  expect(result).toHaveProperty('name', 'name');
});

it('parses "ref" element with compound name', () => {
  const result = parser.parse('$refCompoundNameText');

  expect(result).toHaveProperty('element', 'ref');
  expect(result).toHaveProperty('name', 'compoundName');
});

it('parses "ref" element with ambiguous name', () => {
  const result = parser.parse('$refTextText');

  expect(result).toHaveProperty('element', 'ref');
  expect(result).toHaveProperty('name', 'text');
});

// Errors
it('throws error for missing param', () => {
  expect(() => {
    parser.parse('$el');
  }).toThrow('Invalid param/value for [el]');
});

it('throws error for missing value', () => {
  expect(() => {
    parser.parse('$elAttr');
  }).toThrow('Invalid param/value for [el]');
});

it('throws error for missing name and param', () => {
  expect(() => {
    parser.parse('$ref');
  }).toThrow('Invalid param/value for [ref]');
});

it('throws error for missing param', () => {
  expect(() => {
    parser.parse('$refName');
  }).toThrow('Invalid param/value for [ref]');
});

it('throws error for missing value', () => {
  expect(() => {
    parser.parse('$refNameAttr');
  }).toThrow('Invalid param/value for [ref]');
});

// Null
// it('returns null for missing param', () => {
//   expect(parser.parse('$el')).toBeNull();
// });

// it('returns null for missing value', () => {
//   expect(parser.parse('$elAttr')).toBeNull();
// });

// it('returns null for missing name and param', () => {
//   expect(parser.parse('$ref')).toBeNull();
// });

// it('returns null for missing param', () => {
//   expect(parser.parse('$refName')).toBeNull();
// });

// it('returns null for missing value', () => {
//   expect(parser.parse('$refNameAttr')).toBeNull();
// });
