import type { Config } from 'jest';

// Sync object
const config: Config = {
  verbose: true,
  transform: {
    '^.+\\.[tj]sx?$': [
      '@swc/jest',
      {
        module: { type: 'es6' },
        jsc: {
          target: 'es2022',
          parser: {
            syntax: 'typescript',
            tsx: true,
          },
        },
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/tests/**/*.+(ts|tsx|js)', '!**/tests/__mocks__/**/*'],
  setupFiles: ['<rootDir>/jest.setup.ts'],
};

export default config;

