// Sync object
export default {
  verbose: true,
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      { tsconfig: './tsconfig.jest.json', useESM: true },
    ],
  },
  extensionsToTreatAsEsm: ['.ts'],
  // globals: {
  //   'ts-jest': {
  //     useESM: true,
  //   },
  // },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testMatch: ['**/tests/**/*.+(ts|tsx|js)', '!**/tests/__mocks__/**/*'],
};
