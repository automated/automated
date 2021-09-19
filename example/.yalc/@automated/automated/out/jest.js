"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { render } from '@testing-library/react';
const snapshot_diff_1 = require("snapshot-diff");
const jest_image_snapshot_1 = require("jest-image-snapshot");
const puppeteer_1 = __importDefault(require("puppeteer"));
const change_case_1 = require("change-case");
expect.extend({ toMatchImageSnapshot: jest_image_snapshot_1.toMatchImageSnapshot, toMatchDiffSnapshot: snapshot_diff_1.toMatchDiffSnapshot });
const base = ({ useCases, Component, describeName, }) => {
    let browser;
    beforeAll(async () => {
        browser = await puppeteer_1.default.launch({
            headless: false,
        });
    });
    afterAll(async () => {
        await browser.close();
    });
    describe(describeName, () => {
        Object.entries(useCases).forEach(([key, value]) => {
            const { props } = value;
            // test(`snapshot-${key}`, async () => {
            //   const render = TestRenderer.create(<Component {...props} />);
            //   const renderToJson = render.toJSON();
            //   if (key === 'default') renderToJson;
            //   expect(renderToJson).toMatchSnapshot();
            // });
            test(`image-${key}`, async () => {
                const page = await browser.newPage();
                const url = `http://localhost:3144/iframe.html?id=${(0, change_case_1.paramCase)(describeName)}--${key}&args=&viewMode=story`;
                console.log(url);
                await page.goto(url);
                // caret-color: transparent;
                // await page.screenshot({ path: `example-${key}.png` });
                const image = await page.screenshot();
                await page.close();
                expect(image).toMatchImageSnapshot();
            });
        });
    });
};
exports.default = base;
//# sourceMappingURL=jest.js.map