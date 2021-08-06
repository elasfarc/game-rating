module.exports = {
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ["/node_modules/(?!vue-awesome)"],
  "moduleNameMapper": {
    "\\.(jpg|ico|jpeg|png|gif)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/__mocks__/fileMock.js"
  }
};