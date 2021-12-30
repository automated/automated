import type { Config } from '@jest/types';
import glob from 'glob';
import tsjPreset from 'ts-jest/presets';

import { deriveModulePath } from '../shared';

const automatedFileName = '__automated.tsx';

const scoutGlob = glob.sync(`./**/${automatedFileName}`);

const siblings = scoutGlob.map((x) =>
  x.replace(automatedFileName, '*.{ts,tsx,js,jsx}'),
);

const siblingsGlob = siblings.map((x) =>
  glob.sync(x).filter((a) => a.indexOf(automatedFileName) === -1),
);

const collectCoverageFrom = siblingsGlob.flat();

const config: Config.InitialOptions = {
  ...tsjPreset.defaults,

  collectCoverageFrom,

  coverageDirectory: './tmp/automated/coverage',

  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': deriveModulePath('identity-obj-proxy'),
  },

  reporters: [
    'default',
    deriveModulePath('jest-image-snapshot/src/outdated-snapshot-reporter.js'),
  ],

  // snapshotSerializers: [deriveModulePath('@emotion/jest/serializer')],

  testEnvironment: 'jsdom',

  transform: {
    // this overrides tsjPreset
    '^.+\\.tsx?$': deriveModulePath('ts-jest'),
  },
};

export default config;
