/* global it, expect */
import Parser from '../src/Parser.js';
import rules from 'rules';

const parser = new Parser(rules);

// DEV
// it('throws invalid value for unknown param', () => {
//   expect(() => {
//     parser.parse('$elAttrrr');
//   }).toThrow('Invalid value');
// });
it('returns null for unknown param', () => {
  expect(parser.parse('$elAttrrr')).toBeNull();
});
