module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    // testRegex: '.*\\.test\\.ts$', // Solo archivos .test.ts
    testRegex: '.index_nestjs\\.test\\.ts$', // Solo archivos .test.ts
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    rootDir: '.',
    testEnvironment: 'node', // Cambiar de '@hapi/hapi' a 'node'
  };
  