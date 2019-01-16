module.exports = {
  testURL: 'http://localhost/',
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
    'src/utils/base58.js',
    'src/utils/cryptoUtils.js',
  ],
  clearMocks: true,
  collectCoverage: true,
  testMatch: [
    '**/tests/**/*test.js?(x)',
  ],
};