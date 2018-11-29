/* global it, expect */
import parser from '../src/parser.js';
import rules from 'rules';

parser.init(rules);

it('parses "text" param with "el" element', () => {
  const result = parser.parse('$elText');

  expect(result).toHaveProperty('param', 'text');
});

it('parses "text" param with "ref" element', () => {
  const result = parser.parse('$refFooText');

  expect(result).toHaveProperty('param', 'text');
});

// Errors
it('throws error for for missing element', () => {
  expect(() => {
    parser.parse('$text');
  }).toThrow('Param [text] should use an element');
});

it('throws error for excess value', () => {
  expect(() => {
    parser.parse('$elTextValue');
  }).toThrow('Param [text] do not accept value [value]');
});

// Null
// it('returns null for missing element', () => {
//   expect(parser.parse('$text')).toBeNull();
// });

// it('returns null for excess value', () => {
//   expect(parser.parse('$elTextValue')).toBeNull();
// });
