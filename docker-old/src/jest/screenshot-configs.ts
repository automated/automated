import { Viewport, ScreenshotOptions } from 'puppeteer';
import { MatchImageSnapshotOptions } from 'jest-image-snapshot';
import uuidByString from 'uuid-by-string';

type ScreenshotConfig = {
  viewport: Viewport;
  screenshotOptions: ScreenshotOptions;
  matchImageSnapshotOptions: MatchImageSnapshotOptions;
};

type ScreenshotConfigs = Record<string, ScreenshotConfig>;

const defaults: ScreenshotConfig = {
  // desktop
  viewport: {
    deviceScaleFactor: 2,
    height: 768,
    width: 1080,
  },

  screenshotOptions: {
    omitBackground: true,
  },

  matchImageSnapshotOptions: {
    failureThreshold: 0.01,
    failureThresholdType: 'percent',
  },
};

const configs = [
  defaults,
  {
    ...defaults,

    viewport: {
      deviceScaleFactor: 2,
      width: 375,
      height: 812,
      isMobile: true,
      hasTouch: true,
    },
  },
];

const out: ScreenshotConfigs = configs.reduce((acc, config) => {
  acc[uuidByString(JSON.stringify(config))] = config;

  return acc;
}, <ScreenshotConfigs>{});

export default out;
