/* global it, expect */
import Parser from '../src/Parser.js';
import rules from 'rules';

const parser = new Parser(rules);

it('parses "url" without value', () => {
  const result = parser.parse('$url');

  expect(result).toHaveProperty('param', 'url');
  expect(result).not.toHaveProperty('value');
});

it('parses "url" param', () => {
  const result = parser.parse('$urlValue');

  expect(result).toHaveProperty('param', 'url');
  expect(result).toHaveProperty('value', 'value');
});

it('parses "url" param with extra and value', () => {
  const result = parser.parse('$urlSearchValue');

  expect(result).toHaveProperty('param', 'url');
  expect(result).toHaveProperty('extra', 'search');
  expect(result).toHaveProperty('value', 'value');
});

it('parses "url" param with other extra and no value', () => {
  const result = parser.parse('$urlHash');

  expect(result).toHaveProperty('param', 'url');
  expect(result).toHaveProperty('extra', 'hash');
});

// DEV
// it('throws invalid value for unauthorized "el" element', () => {
//   expect(() => {
//     parser.parse('$elUrl');
//   }).toThrow('Invalid value');
// });

// it('throws invalid value for unauthorized "ref" element', () => {
//   expect(() => {
//     parser.parse('$refNameUrl');
//   }).toThrow('Invalid value');
// });
it('returns null for unauthorized "el" element', () => {
  expect(parser.parse('$elUrl')).toBeNull();
});

it('returns null for unauthorized "ref" element', () => {
  expect(parser.parse('$refNameUrl')).toBeNull();
});
