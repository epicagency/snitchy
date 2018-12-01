module.exports = {
  collectCoverageFrom: [
    'packages/**/src/**/*.{js,jsx}',
    '!packages/core/src/(schema|utils).js',
  ],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  resetMocks: true,
  testMatch: ['**/__tests__/**/*.test.js'],
  transformIgnorePatterns: ['<rootDir>.*(node_modules)(?!.*@snitchy.*).*$'],
  verbose: true,
  watchPlugins: ['jest-watch-lerna-packages'],
};
