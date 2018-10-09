/* global it, expect */
import Parser from '../src/Parser.js';
import rules from 'rules';

const parser = new Parser(rules);

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

// DEV
// it('throws invalid value for missing param', () => {
//   expect(() => {
//     parser.parse('$el');
//   }).toThrow('Invalid value');
// });

// it('throws invalid value for missing value', () => {
//   expect(() => {
//     parser.parse('$elAttr');
//   }).toThrow('Invalid value');
// });

// it('throws invalid value for missing name and param', () => {
//   expect(() => {
//     parser.parse('$ref');
//   }).toThrow('Invalid value');
// });

// it('throws invalid value for missing param', () => {
//   expect(() => {
//     parser.parse('$refName');
//   }).toThrow('Invalid value');
// });

// it('throws invalid value for missing value', () => {
//   expect(() => {
//     parser.parse('$refNameAttr');
//   }).toThrow('Invalid value');
// });
it('returns null for missing param', () => {
  expect(parser.parse('$el')).toBeNull();
});

it('returns null for missing value', () => {
  expect(parser.parse('$elAttr')).toBeNull();
});

it('returns null for missing name and param', () => {
  expect(parser.parse('$ref')).toBeNull();
});

it('returns null for missing param', () => {
  expect(parser.parse('$refName')).toBeNull();
});

it('returns null for missing value', () => {
  expect(parser.parse('$refNameAttr')).toBeNull();
});
