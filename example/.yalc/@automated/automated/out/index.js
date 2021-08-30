"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runner = void 0;
const snapshot_diff_1 = require("snapshot-diff");
const react_1 = __importDefault(require("react"));
// import { render } from '@testing-library/react';
const react_test_renderer_1 = __importDefault(require("react-test-renderer"));
const react_2 = require("@storybook/react");
// import '@testing-library/jest-dom/extend-expect';
const wrapper_1 = __importDefault(require("./storybook/wrapper"));
expect.extend({ toMatchDiffSnapshot: snapshot_diff_1.toMatchDiffSnapshot });
const defaultUseCase = {};
const defaultUseCases = { default: defaultUseCase };
const isJest = !!process.env.JEST_WORKER_ID;
const isStorybook = !!process.env.STORYBOOK;
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
    if (isJest) {
        describe(describeName, () => {
            Object.keys(useCases).forEach((key) => {
                const { props } = useCases[key];
                test(key, () => {
                    const render = react_test_renderer_1.default.create(react_1.default.createElement(Component, { ...props }));
                    const renderToJson = render.toJSON();
                    if (key === 'default')
                        renderToJson;
                    expect(renderToJson).toMatchSnapshot();
                });
            });
        });
    }
};
exports.runner = runner;
//# sourceMappingURL=index.js.map