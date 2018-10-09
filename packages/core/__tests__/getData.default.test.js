/* global it, expect */
import snitchy from '../src';

it('gets null data on invalid $value', () => {
  const result = snitchy._getData();

  expect(result).toStrictEqual({});
});

it('gets data on static value', () => {
  const expected = { key: 'static' };
  const result = snitchy._getData(expected);

  expect(result).toStrictEqual(expected);
});

it('gets data on dynamic $value', () => {
  const expected = { key: null };
  const result = snitchy._getData({ key: '$dynamic' });

  expect(result).toStrictEqual(expected);
});
