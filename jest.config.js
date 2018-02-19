module.exports = {
  modulePaths: [
    './src',
  ],
  moduleFileExtensions: [
    'js',
  ],
  moduleDirectories: [
    'node_modules',
  ],
  coveragePathIgnorePatterns: [
    'src/base58.js',
    'src/cryptoUtils.js',
  ],
  clearMocks: true,
  collectCoverage: true,
  testMatch: [
    '**/tests/**/*test.js?(x)',
  ],
};