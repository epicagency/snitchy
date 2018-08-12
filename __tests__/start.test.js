/* global it, expect */
import snitchy, { Snitchy } from '../src';

it('creates on single instance', () => {
  const newSnitchy = Snitchy.start();

  expect(snitchy).toMatchObject(newSnitchy);
});

