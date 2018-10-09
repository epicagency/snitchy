/* global it, expect */
import snitchy from '../src';

it('defaults false', () => {
  expect(snitchy.debug).toBeFalsy();
});

it('sets true', () => {
  snitchy.debug = true;
  expect(snitchy.debug).toBeTruthy();
});
