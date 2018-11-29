/* global it, expect */
import parser from '../src/parser.js';
import rules from 'rules';

parser.init(rules);

// Errors
it('throws error for unknown param', () => {
  expect(() => {
    parser.parse('$elAttrrr');
  }).toThrow('Invalid param/value for [el]');
});

// Null
// it('returns null for unknown param', () => {
//   expect(parser.parse('$elAttrrr')).toBeNull();
// });
