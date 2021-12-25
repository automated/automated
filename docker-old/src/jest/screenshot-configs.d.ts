import { Viewport, ScreenshotOptions } from 'puppeteer';
import { MatchImageSnapshotOptions } from 'jest-image-snapshot';
declare type ScreenshotConfig = {
    viewport: Viewport;
    screenshotOptions: ScreenshotOptions;
    matchImageSnapshotOptions: MatchImageSnapshotOptions;
};
declare type ScreenshotConfigs = Record<string, ScreenshotConfig>;
declare const out: ScreenshotConfigs;
export default out;
