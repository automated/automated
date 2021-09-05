"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const snapshot_diff_1 = require("snapshot-diff");
const jest_image_snapshot_1 = require("jest-image-snapshot");
expect.extend({ toMatchImageSnapshot: jest_image_snapshot_1.toMatchImageSnapshot, toMatchDiffSnapshot: snapshot_diff_1.toMatchDiffSnapshot });
const base = ({ useCases, Component, describeName, }) => {
    let browser;
    beforeAll(async () => {
        // browser = await puppeteer.launch({
        //   // headless: false,
        // });
    });
    afterAll(async () => {
        await browser.close();
    });
    describe(describeName, () => {
        // console.log('jest!');
        for (const key in useCases) {
            const { props } = useCases[key];
            // test(`snapshot-${key}`, async () => {
            //   const render = TestRenderer.create(<Component {...props} />);
            //   const renderToJson = render.toJSON();
            //   if (key === 'default') renderToJson;
            //   expect(renderToJson).toMatchSnapshot();
            // });
            test(`image-${key}`, async () => {
                const page = await browser.newPage();
                const url = `http://localhost:3144/iframe.html?id=${key}&args=&viewMode=story`;
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
};
exports.default = base;
//# sourceMappingURL=jest.js.map