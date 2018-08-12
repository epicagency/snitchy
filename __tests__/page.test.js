/* global it, expect */
import snitchy from '../src';

it.skip('has default layer', () => {
  const variables = {
    pages: { foo: 'foo' },
    components: { foo: 'foo' },
  };

  snitchy.load(variables);
  snitchy.page();

  console.log(snitchy.variables);
  expect(snitchy.debug).toBeFalsy();
});
