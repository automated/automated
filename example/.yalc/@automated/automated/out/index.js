"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runner = void 0;
// import { toMatchDiffSnapshot } from 'snapshot-diff';
const react_1 = __importDefault(require("react"));
// import { render } from '@testing-library/react';
// import TestRenderer from 'react-test-renderer';
const react_2 = require("@storybook/react");
// import puppeteer from 'puppeteer';
// import '@testing-library/jest-dom/extend-expect';
const wrapper_1 = __importDefault(require("./storybook/wrapper"));
const defaultUseCase = {};
const defaultUseCases = { default: defaultUseCase };
const isJest = !!process.env.JEST_WORKER_ID;
const isStorybook = !!process.env.STORYBOOK;
console.log(process.env);
const runner = ({ filename, Component, process: theirProcess, useCases: useCasesProp, }) => {
    const initCwd = String(theirProcess.env.INIT_CWD);
    if (!initCwd)
        throw new Error('Missing `process.env.INIT_CWD`');
    const describeName = filename.replace(initCwd, '');
    const foo = (0, react_2.storiesOf)('Button', module);
    const useCases = useCasesProp || defaultUseCases;
    if (isStorybook) {
        Object.keys(useCases).forEach((key) => {
            const { props } = useCases[key];
            foo.add(key, () => (react_1.default.createElement(wrapper_1.default, null,
                react_1.default.createElement(Component, { ...props }))));
        });
    }
    // if (isJest) {
    //   describe(describeName, () => {
    //     console.log('jest!');
    //     Object.keys(useCases).forEach((key) => {
    //       const { props } = useCases[key];
    //       test(key, () => {
    //         const render = TestRenderer.create(<Component {...props} />);
    //         const renderToJson = render.toJSON();
    //         if (key === 'default') renderToJson;
    //         expect(renderToJson).toMatchSnapshot();
    //       });
    //       (async () => {
    //         const browser = await puppeteer.launch();
    //         const page = await browser.newPage();
    //         await page.goto('https://example.com');
    //         await page.screenshot({ path: 'example.png' });
    //         await browser.close();
    //       })();
    //     });
    //   });
    // }
};
exports.runner = runner;
//# sourceMappingURL=index.js.map