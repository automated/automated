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

const configs = [defaults];

const out: ScreenshotConfigs = configs.reduce((acc, config) => {
  acc[uuidByString(JSON.stringify(config))] = config;

  return acc;
}, <ScreenshotConfigs>{});

export default out;
