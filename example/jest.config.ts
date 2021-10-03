import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  testEnvironment: 'jsdom',

  snapshotSerializers: ["@emotion/jest/serializer"]
};

export default config;
