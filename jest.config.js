const $ = require('jquery');

module.exports = {
  globals: {
    window: true,
    $,
  },
  setupTestFrameworkScriptFile: '<rootDir>/test-setup.js',
  setupFiles: ['jest-localstorage-mock', 'raf/polyfill'],
  testPathIgnorePatterns: ['./server/test/test', './node_modules/', './client/actions/test'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js'
  }
};
