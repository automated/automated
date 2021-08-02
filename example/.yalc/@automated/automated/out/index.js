"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runner = void 0;
const react_1 = __importDefault(require("react"));
// import { render } from '@testing-library/react';
const react_test_renderer_1 = __importDefault(require("react-test-renderer"));
const defaultUseCase = {};
const defaultUseCases = { default: defaultUseCase };
const runner = ({ filename, Component, process: theirProcess, useCases: useCasesProp, }) => {
    const initCwd = String(theirProcess.env.INIT_CWD);
    if (!initCwd)
        throw new Error('Missing `process.env.INIT_CWD`');
    const describeName = filename.replace(initCwd, '');
    describe(describeName, () => {
        const useCases = useCasesProp || defaultUseCases;
        Object.keys(useCases).forEach((key) => {
            const { props } = useCases[key];
            test(key, () => {
                const render = react_test_renderer_1.default.create(react_1.default.createElement(Component, Object.assign({}, props)));
                expect(render.toJSON()).toMatchSnapshot();
            });
        });
    });
};
exports.runner = runner;
//# sourceMappingURL=index.js.map