// import type { Config } from '@jest/types';

// const config = {
//   // testEnvironment: 'jsdom',

//   globals: {
//     __IS_STORYBOOK__: false,
//   },
// };

const config = {
  setupFilesAfterEnv: ['./jest.setup.js'],
};

export default config;
