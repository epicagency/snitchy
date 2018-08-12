/* global it, expect, jest */
import snitchy from '../src';
import dataLayer from 'dataLayer';

it('pushes data', () => {
  snitchy.push({});

  expect(dataLayer.push).toHaveBeenCalled();
});

it('displays push data on debug', () => {
  global.console = {
    ...global.console,
    info: jest.fn(),
    table: jest.fn(),
  };

  snitchy.debug = true;
  snitchy.push({});

  expect(global.console.info).toHaveBeenCalled();
  expect(global.console.table).toHaveBeenCalled();
});

it('throws error if no dataLayer', () => {
  function push() { // eslint-disable-line require-jsdoc
    snitchy.push({});
  }

  delete window.dataLayer;
  snitchy.debug = false;

  expect(push).toThrow('No "dataLayer" found. Check if GTM is correctly configured.');
});
