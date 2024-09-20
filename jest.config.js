module.exports = {
    preset: 'ts-jest',
    transform: {
      '^.+\\.(t|j)sx?$': ['@swc/jest'],
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).ts?(x)'], 
    setupFilesAfterEnv: ['./jest.setup.js']
  };
  