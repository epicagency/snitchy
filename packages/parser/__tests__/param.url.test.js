/* global it, expect */
import parser from '../src/parser.js';
import rules from 'rules';

parser.init(rules);

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

it('throws error for unauthorized "el" element', () => {
  expect(() => {
    parser.parse('$elUrl');
  }).toThrow('Param [url] do not accept element [el]');
});

it('throws error for unauthorized "ref" element', () => {
  expect(() => {
    parser.parse('$refNameUrl');
  }).toThrow('Param [url] do not accept element [ref]');
});

// Null
// it('returns null for unauthorized "el" element', () => {
//   expect(parser.parse('$elUrl')).toBeNull();
// });

// it('returns null for unauthorized "ref" element', () => {
//   expect(parser.parse('$refNameUrl')).toBeNull();
// });
