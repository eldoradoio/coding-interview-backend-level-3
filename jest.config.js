module.exports = {
    roots: ['<rootDir>/dist/e2e'], // Directorio donde están los archivos compilados de e2e
    transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
    },
   }
   