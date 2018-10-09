/* global it, expect */
import { Snitchy } from '../src';

it('destroys existing instance', () => {
  const expected = Snitchy.destroy();

  expect(expected).toBeNull();
});
