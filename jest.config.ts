// Sync object
const config= {
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFiles: [
    "./tests/__mocks__/client.ts"
  ],
};
module.exports= config;
