/* global it, expect */
import snitchy, { Snitchy } from '../src';

it('creates one single instance', () => {
  const newSnitchy = Snitchy.start();

  expect(snitchy).toStrictEqual(newSnitchy);
});
