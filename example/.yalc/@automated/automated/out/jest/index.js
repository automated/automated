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
const node_fetch_1 = __importDefault(require("node-fetch"));
expect.extend({ toMatchImageSnapshot: jest_image_snapshot_1.toMatchImageSnapshot, toMatchDiffSnapshot: snapshot_diff_1.toMatchDiffSnapshot });
const runner = ({ dirname, Component, useCases: useCasesProp, }) => {
    const describeName = (0, derive_describe_name_1.default)({ dirname });
    const useCases = (0, derive_use_cases_1.default)({ useCases: useCasesProp });
    let browser;
    let isStorybookRunning = false;
    beforeAll(async () => {
        try {
            const storybookRes = await (0, node_fetch_1.default)(shared_1.default.storybookUrl);
            console.log(storybookRes);
            isStorybookRunning = true;
            browser = await puppeteer_1.default.launch({
                headless: false,
            });
        }
        catch (error) {
            // console.log(error);
        }
    });
    afterAll(async () => {
        if (isStorybookRunning) {
            await browser.close();
        }
    });
    describe(describeName, () => {
        Object.entries(useCases).forEach(async ([key, value]) => {
            const { props } = value;
            test(`snapshot-${key}`, async () => {
                const render = react_test_renderer_1.default.create(react_1.default.createElement(Component, { ...props }));
                const renderToJson = render.toJSON();
                if (key === 'default')
                    renderToJson;
                expect(renderToJson).toMatchSnapshot();
            });
            if (isStorybookRunning) {
                test(`image-${key}`, async () => {
                    const page = await browser.newPage();
                    const url = `${shared_1.default.storybookUrl}/iframe.html?id=${(0, change_case_1.paramCase)(describeName)}--${key}&args=&viewMode=story`;
                    console.log(url);
                    await page.goto(url);
                    // caret-color: transparent;
                    // await page.screenshot({ path: `example-${key}.png` });
                    const image = await page.screenshot();
                    await page.close();
                    expect(image).toMatchImageSnapshot();
                });
            }
        });
    });
};
exports.runner = runner;
//# sourceMappingURL=index.js.map