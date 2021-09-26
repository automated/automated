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
// import asyncLoop from '../utils/async-loop';
const shared_1 = __importDefault(require("../shared"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const console = require('console');
expect.extend({ toMatchImageSnapshot: jest_image_snapshot_1.toMatchImageSnapshot, toMatchDiffSnapshot: snapshot_diff_1.toMatchDiffSnapshot });
const runner = async ({ dirname, Component, useCases: useCasesProp, }) => {
    const describeName = (0, derive_describe_name_1.default)({ dirname });
    const useCases = (0, derive_use_cases_1.default)({ useCases: useCasesProp });
    let isStorybookRunning = false;
    let storybookTestFn = process.env.STORYBOOK_IS_RUNNING ? test : test.skip;
    let browser;
    beforeAll(async () => {
        const { status } = await (0, node_fetch_1.default)(shared_1.default.storybookUrl);
        isStorybookRunning = status === 200;
        if (isStorybookRunning) {
            browser = await puppeteer_1.default.launch({
                headless: false,
            });
        }
    });
    describe(describeName, () => {
        useCases.forEach(async (item, key) => {
            const { name } = item;
            // test(`snapshot-${name}`, async () => {
            //   const render = TestRenderer.create(<Component {...props} />);
            //   const renderToJson = render.toJSON();
            //   if (!key) renderToJson;
            //   expect(renderToJson).toMatchSnapshot();
            // });
            afterAll(async () => {
                if (browser)
                    await browser.close();
            });
            storybookTestFn(`image-${name}`, async () => {
                if (browser) {
                    const page = await browser.newPage();
                    const id = `${(0, change_case_1.paramCase)(describeName)}--${name}`;
                    const url = `${shared_1.default.storybookUrl}/iframe.html?id=${id}&args=&viewMode=story`;
                    await page.goto(url);
                    // // caret-color: transparent;
                    await page.screenshot({ path: `${id}.png` });
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