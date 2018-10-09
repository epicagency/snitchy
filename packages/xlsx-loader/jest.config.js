const { jest: lernaAliases } = require('lerna-alias');
const jestBase = require('../../jest.config.js');

module.exports = {
  ...jestBase,
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  moduleNameMapper: lernaAliases({ mainFields: ['module'] }),
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js'],
};
