/* global it, expect */
import { Snitchy } from '../src';

it('parses single value', () => {
  const expected = ['foo'];
  const result = Snitchy.parseValue('foo');

  expect(result).toMatchObject(expected);
});

it('parses single variable', () => {
  const expected = ['foo'];
  const result = Snitchy.parseValue('$foo');

  expect(result).toMatchObject(expected);
});

it('parses double variable', () => {
  const expected = ['foo', 'bar'];
  const result = Snitchy.parseValue('$fooBar');

  expect(result).toMatchObject(expected);
});

it('parses multiple variable', () => {
  const expected = ['foo', 'barBaz'];
  const result = Snitchy.parseValue('$fooBarBaz');

  expect(result).toMatchObject(expected);
});
