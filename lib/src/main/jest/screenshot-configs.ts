import { MatchImageSnapshotOptions } from 'jest-image-snapshot';
import { ScreenshotOptions, Viewport } from 'puppeteer';

import { deriveModule } from '../shared';

type ScreenshotConfig = {
  viewport: Viewport;
  screenshotOptions: ScreenshotOptions;
  matchImageSnapshotOptions: MatchImageSnapshotOptions;
};

type ScreenshotConfigs = Record<string, ScreenshotConfig>;

const defaults: ScreenshotConfig = {
  matchImageSnapshotOptions: {
    failureThreshold: 0.01,
    failureThresholdType: 'percent',
  },

  screenshotOptions: {
    omitBackground: true,
  },

  // desktop
  viewport: {
    deviceScaleFactor: 2,
    height: 768,
    width: 1080,
  },
};

const configs = [
  defaults,
  {
    ...defaults,

    viewport: {
      deviceScaleFactor: 2,
      hasTouch: true,
      height: 812,
      isMobile: true,
      width: 375,
    },
  },
];

const out = async (): Promise<ScreenshotConfigs> => {
  const uuidByString = (await import(deriveModule('uuid-by-string'))).default;

  return configs.reduce((acc, config) => {
    acc[uuidByString(JSON.stringify(config))] = config;

    return acc;
  }, <ScreenshotConfigs>{});
};

export default out;
