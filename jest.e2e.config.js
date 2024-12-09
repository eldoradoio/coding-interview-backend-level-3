module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    // testRegex: '.*\\.test\\.ts$',
    testRegex: '.index_nestjs\\.test\\.ts$', 
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    rootDir: '.',
    testEnvironment: 'node',
  };
  