"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runner = void 0;
const change_case_1 = require("change-case");
const snapshot_diff_1 = require("snapshot-diff");
const jest_image_snapshot_1 = require("jest-image-snapshot");
const derive_describe_name_1 = __importDefault(require("../utils/derive-describe-name"));
const derive_use_cases_1 = __importDefault(require("../utils/derive-use-cases"));
const shared_1 = __importDefault(require("../shared"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const react_test_renderer_1 = __importDefault(require("react-test-renderer"));
const react_1 = __importDefault(require("react"));
const console = require('console');
expect.extend({ toMatchImageSnapshot: jest_image_snapshot_1.toMatchImageSnapshot, toMatchDiffSnapshot: snapshot_diff_1.toMatchDiffSnapshot });
const runner = async ({ dirname, Component, useCases: useCasesProp, }) => {
    const describeName = (0, derive_describe_name_1.default)({ dirname });
    const useCases = (0, derive_use_cases_1.default)({ useCases: useCasesProp });
    let isStorybookRunning = process.env.STORYBOOK_IS_RUNNING;
    let storybookTestFn = isStorybookRunning ? test : test.skip;
    let browser;
    beforeAll(async () => {
        if (isStorybookRunning) {
            browser = await puppeteer_1.default.launch({
                headless: false,
            });
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
                const renderToJson = render.toJSON();
                if (!key)
                    renderToJson;
                expect(renderToJson).toMatchSnapshot();
            });
            storybookTestFn(`storybook-${name}`, async () => {
                if (browser) {
                    const page = await browser.newPage();
                    await page.evaluateOnNewDocument(() => {
                        const style = document.createElement('style');
                        style.innerHTML = '.body { caret-color: transparent }';
                        document.getElementsByTagName('head')[0].appendChild(style);
                    });
                    const id = `${(0, change_case_1.paramCase)(describeName)}--${name}`;
                    const url = `${shared_1.default.storybookUrl}/iframe.html?id=${id}&args=&viewMode=story`;
                    console.log(url);
                    await page.goto(url);
                    const image = await page.screenshot();
                    expect(image).toMatchImageSnapshot({
                        failureThreshold: 0.01,
                        failureThresholdType: 'percent',
                    });
                    await page.close();
                }
            });
        });
    });
};
exports.runner = runner;
//# sourceMappingURL=index.js.map