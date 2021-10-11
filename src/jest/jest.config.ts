import glob from 'glob';
import type { Config } from '@jest/types';

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
  reporters: [
    'default',
    'jest-image-snapshot/src/outdated-snapshot-reporter.js',
  ],

  coverageDirectory: './coverage-from-automated',

  collectCoverageFrom,
};

export default config;