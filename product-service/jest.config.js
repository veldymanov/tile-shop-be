module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@functions/(.*)$': '<rootDir>/src/functions/$1',
    '^@libs/(.*)$': '<rootDir>/src/libs/$1',
    '^@middy/(.*)$': '<rootDir>/node_modules/@middy/$1',
  },
  globals: {
    'ts-jest': {
      diagnostics: {
        diagnostics: false
      }
    }
  }
};