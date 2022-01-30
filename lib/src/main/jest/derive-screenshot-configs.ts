import { MatchImageSnapshotOptions } from 'jest-image-snapshot';
import { ScreenshotOptions, Viewport } from 'puppeteer';

import { deriveModule } from '../shared';

type ScreenshotConfig = {
  matchImageSnapshotOptions: MatchImageSnapshotOptions;
  screenshotOptions: ScreenshotOptions;
  viewport: Viewport;
};

const viewportDefaults: Partial<Viewport> = {
  deviceScaleFactor: 2,
};

const matchImageSnapshotOptionsDefaults: MatchImageSnapshotOptions = {};

const screenshotOptionsDefaults: ScreenshotOptions = {
  omitBackground: true,
};

const configDefaults: Omit<ScreenshotConfig, 'viewport'> = {
  matchImageSnapshotOptions: matchImageSnapshotOptionsDefaults,
  screenshotOptions: screenshotOptionsDefaults,
};

const configs: Array<ScreenshotConfig> = [
  {
    ...configDefaults,

    // generic desktop
    viewport: {
      ...viewportDefaults,

      height: 768,
      width: 1080,
    },
  },

  {
    ...configDefaults,

    // generic mobile
    viewport: {
      ...viewportDefaults,

      hasTouch: true,
      height: 812,
      isMobile: true,
      width: 375,
    },
  },
];

type ScreenshotConfigs = Record<string, ScreenshotConfig>;

export default (): ScreenshotConfigs => {
  const uuidByString = deriveModule('uuid-by-string');

  return configs.reduce((acc, config) => {
    acc[uuidByString(JSON.stringify(config))] = config;

    return acc;
  }, <ScreenshotConfigs>{});
};
