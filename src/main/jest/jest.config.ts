import glob from 'glob';
import type { Config } from '@jest/types';
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

  transform: {
    // this overrides tsjPreset
    '^.+\\.tsx?$': deriveModulePath('ts-jest'),
  },

  reporters: [
    'default',
    deriveModulePath('jest-image-snapshot/src/outdated-snapshot-reporter.js'),
  ],

  coverageDirectory: './tmp/automated/coverage',

  collectCoverageFrom,

  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
  },

  snapshotSerializers: [deriveModulePath('@emotion/jest/serializer')],

  testEnvironment: 'jsdom',
};

export default config;
