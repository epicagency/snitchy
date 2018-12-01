const jestBase = require('../../jest.config.js');

module.exports = {
  ...jestBase,
  collectCoverageFrom: [
    '<rootDir>/src/*.{js,jsx}',
    '!<rootDir>/src/utils.js',
  ],
};
