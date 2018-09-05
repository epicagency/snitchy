/* global it, expect */
import snitchy, { Snitchy } from '../src';

it('destroys existing instance', () => {
  Snitchy.destroy();
  const newSnitchy = Snitchy.start();

  expect(snitchy).not.toMatchObject(newSnitchy);
});

