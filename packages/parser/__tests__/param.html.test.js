/* global it, expect */
import Parser from '../src/Parser.js';
import rules from 'rules';

const parser = new Parser(rules);

it('parses "html" param with "el" element', () => {
  const result = parser.parse('$elHtml');

  expect(result).toHaveProperty('param', 'html');
});

it('parses "html" param with "ref" element', () => {
  const result = parser.parse('$refNameHtml');

  expect(result).toHaveProperty('param', 'html');
});

// DEV
// it('throws invalid value for missing element', () => {
//   expect(() => {
//     parser.parse('$html');
//   }).toThrow('Invalid value');
// });

// it('throws invalid value for excess value', () => {
//   expect(() => {
//     parser.parse('$elHtmlValue');
//   }).toThrow('Invalid value');
// });

it('returns null for missing element', () => {
  expect(parser.parse('$html')).toBeNull();
});

it('returns null for excess value', () => {
  expect(parser.parse('$elHtmlValue')).toBeNull();
});
