/* global it, expect */
// import { Snitchy } from '../src';

it('is a test', () => {
  // console.info('TEST', snitchy);
  expect(true).toBeTruthy();
});

it('throws error when no dataLayer', () => {
  function start() { // eslint-disable-line require-jsdoc
    require('snitchy'); // eslint-disable-line global-require
  }
  expect(start).toThrow();
});
