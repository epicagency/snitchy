/* global it, expect, jest */
import snitchy from '../src';

// const variables = {
//   pages: { foo: 'foo' },
//   components: { foo: 'foo' },
// };

// snitchy.load(variables);

it('does nothing with empty data', () => {
  const expected = {};
  const result = snitchy.getData();

  expect(result).toMatchObject(expected);
});

it('gets data', () => {
  const expected = { test: 'static' };
  const result = snitchy.getData({ test: 'static' });

  expect(result).toMatchObject(expected);
});

it('gets dynamic data', () => {
  snitchy.values = { foo: 'bar' };
  const expected = { test: 'bar' };
  const result = snitchy.getData({ test: '$valFoo' });

  expect(result).toMatchObject(expected);
});

it.skip('displays warning on null data', () => {
  snitchy.values = { foo: null };
  global.console = {
    ...global.console,
    warn: jest.fn(),
  };

  snitchy.getData({ test: '$valFoo' });

  expect(global.console.warn).toHaveBeenCalled();
});
