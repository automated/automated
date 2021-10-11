import glob from 'glob';
import type { Config } from '@jest/types';

const foo = glob.sync('./**/__automated.tsx');

console.log(foo);

const config: Config.InitialOptions = {
  reporters: [
    'default',
    'jest-image-snapshot/src/outdated-snapshot-reporter.js',
  ],

  collectCoverageFrom: foo,
};

export default config;
