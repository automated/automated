"use strict";
// import React from 'react';
// import { UseCase, UseCases } from '../types';
// import { storiesOf } from '@storybook/react';
// // import storybookRunner from './storybook';
// // import jestRunner from './jest';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runner = void 0;
// const deriveDescribeName = ({ filename }: { filename: string }) => {
//   const pwd = String(process.env.PWD);
//   if (!pwd || pwd === 'undefined') {
//     throw new Error('Missing `process.env.PWD`');
//   }
//   return filename.replace(pwd, '');
//   // const initCwd = String(theirProcess.env.INIT_CWD);
//   // if (!initCwd || initCwd === 'undefined') {
//   //   // throw new Error('Missing `process.env.INIT_CWD`');
//   // }
//   // const describeName = filename.replace(initCwd, '');
// };
// const defaultUseCase: UseCase = {};
// const defaultUseCases: UseCases = { default: defaultUseCase };
// export const runner = ({
//   filename,
//   Component,
//   // process: theirProcess,
//   useCases: useCasesProp,
// }: {
//   filename: string;
//   // process: Process;
//   Component: React.ElementType;
//   useCases?: UseCases;
// }) => {
//   const foo = storiesOf('Button', module);
//   const Foo = () => <div>kldskjsflk</div>;
//   foo.add('hello', () => <Foo />);
// };
const react_1 = require("@storybook/react");
const react_2 = __importDefault(require("react"));
const wrapper_1 = __importDefault(require("./wrapper"));
const derive_describe_name_1 = __importDefault(require("../utils/derive-describe-name"));
const derive_use_cases_1 = __importDefault(require("../utils/derive-use-cases"));
const runner = ({ dirname, Component, useCases: useCasesProp, }) => {
    const describeName = (0, derive_describe_name_1.default)({ dirname });
    const useCases = (0, derive_use_cases_1.default)({ useCases: useCasesProp });
    const storiesOfInstance = (0, react_1.storiesOf)(describeName, module);
    Object.entries(useCases).forEach(([key, value]) => {
        const { props } = value;
        storiesOfInstance.add(key, () => (react_2.default.createElement(wrapper_1.default, null,
            react_2.default.createElement(Component, { ...props }))));
    });
};
exports.runner = runner;
//# sourceMappingURL=storybook.js.map