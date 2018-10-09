/* global it, expect */
import compiler from './compiler.js';
import data from 'data';

it('Load and parse XLSX file', async () => {
  const expected = JSON.stringify(data);
  const stats = await compiler('variables.xlsx');
  const output = stats.toJson().modules[0].source;

  expect(output).toBe(`export default ${expected}`);
});
