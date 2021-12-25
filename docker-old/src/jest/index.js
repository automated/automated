"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runner = void 0;
const change_case_1 = require("change-case");
const snapshot_diff_1 = __importDefault(require("snapshot-diff"));
const jest_image_snapshot_1 = require("jest-image-snapshot");
const derive_describe_name_1 = __importDefault(require("../utils/derive-describe-name"));
const derive_use_cases_1 = __importDefault(require("../utils/derive-use-cases"));
const shared = require('../storybook/shared');
const puppeteer_1 = __importDefault(require("puppeteer"));
const react_test_renderer_1 = __importDefault(require("react-test-renderer"));
const react_1 = __importDefault(require("react"));
const screenshot_configs_1 = __importDefault(require("./screenshot-configs"));
expect.extend({
    toMatchImageSnapshot: jest_image_snapshot_1.toMatchImageSnapshot,
});
const runner = async ({ dirname, Component, useCases: useCasesProp, }) => {
    const describeName = (0, derive_describe_name_1.default)({ dirname });
    const useCases = (0, derive_use_cases_1.default)({ useCases: useCasesProp });
    let isStorybookRunning = process.env.AUTOMATED_STORYBOOK_IS_RUNNING;
    let storybookTestFn = isStorybookRunning ? test : test.skip;
    let browser;
    beforeAll(async () => {
        if (isStorybookRunning) {
            browser = await puppeteer_1.default.launch({
                // headless: false,
                args: ['--no-sandbox'],
            });
        }
        else {
            if (process.env.AUTOMATED_JEST_VISUAL_REGRESSION_REQUIRED) {
                throw new Error('`AUTOMATED_JEST_VISUAL_REGRESSION_REQUIRED` is true, ' +
                    'but visual regression is disabled');
            }
        }
    });
    describe(describeName, () => {
        useCases.forEach(async (item, key) => {
            const { name, props } = item;
            afterAll(async () => {
                if (browser)
                    await browser.close();
            });
            test(`snapshot-${name}`, async () => {
                const render = react_test_renderer_1.default.create(react_1.default.createElement(Component, { ...props }));
                if (!key) {
                    expect(react_1.default.createElement(Component, { ...props })).toMatchSnapshot();
                }
                else {
                    expect((0, snapshot_diff_1.default)(react_1.default.createElement(Component, { ...useCases[0].props }), react_1.default.createElement(Component, { ...props }))).toMatchSnapshot();
                }
            });
            Object.entries(screenshot_configs_1.default).forEach(([configName, { viewport, matchImageSnapshotOptions, screenshotOptions },]) => {
                storybookTestFn(`storybook@${describeName}@${name}@${configName}`, async () => {
                    if (browser) {
                        const page = await browser.newPage();
                        await page.evaluateOnNewDocument(() => {
                            const style = document.createElement('style');
                            style.innerHTML = '.body { caret-color: transparent }';
                            document.getElementsByTagName('head')[0].appendChild(style);
                        });
                        const storybookId = `${(0, change_case_1.paramCase)(describeName)}--${name}`;
                        const url = `${shared.getStorybookUrl()}/iframe.html?id=${storybookId}&args=&viewMode=story`;
                        await page.goto(url);
                        await page.setViewport(viewport);
                        const image = await page.screenshot(screenshotOptions);
                        expect(image).toMatchImageSnapshot(matchImageSnapshotOptions);
                        await page.close();
                    }
                });
            });
        });
    });
};
exports.runner = runner;
//# sourceMappingURL=index.js.map