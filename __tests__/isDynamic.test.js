/* global it, expect */
import { Snitchy } from '../src';

it('check non dynamic value', () => {
  const result = Snitchy.isDynamicValue('foo');

  expect(result).toBeFalsy();
});

it('check dynamic value', () => {
  const result = Snitchy.isDynamicValue('$foo');

  expect(result).toBeTruthy();
});
