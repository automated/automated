import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  "reporters": [
    "default",
    "jest-image-snapshot/src/outdated-snapshot-reporter.js"
  ]
}

export default config;
