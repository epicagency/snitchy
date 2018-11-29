/* global it, expect */
import parser from '../src/parser.js';
import rules from 'rules';

parser.init(rules);

it('parses "html" param with "el" element', () => {
  const result = parser.parse('$elHtml');

  expect(result).toHaveProperty('param', 'html');
});

it('parses "html" param with "ref" element', () => {
  const result = parser.parse('$refNameHtml');

  expect(result).toHaveProperty('param', 'html');
});

// Errors
it('throws error for for missing element', () => {
  expect(() => {
    parser.parse('$html');
  }).toThrow('Param [html] should use an element');
});

it('throws error for excess value', () => {
  expect(() => {
    parser.parse('$elHtmlValue');
  }).toThrow('Param [html] do not accept value [value]');
});

// Null
// it('returns null for missing element', () => {
//   expect(parser.parse('$html')).toBeNull();
// });

// it('returns null for excess value', () => {
//   expect(parser.parse('$elHtmlValue')).toBeNull();
// });
