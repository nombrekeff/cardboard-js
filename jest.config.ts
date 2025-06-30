import type { Config } from 'jest';

// Sync object
const config: Config = {
  verbose: true,
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      { tsconfig: './tsconfig.jest.json', useESM: true },
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

