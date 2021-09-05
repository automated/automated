"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runner = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("@storybook/react");
// import storybookRunner from './storybook';
// import jestRunner from './jest';
const deriveDescribeName = ({ filename }) => {
    const pwd = String(process.env.PWD);
    if (!pwd || pwd === 'undefined') {
        throw new Error('Missing `process.env.PWD`');
    }
    return filename.replace(pwd, '');
    // const initCwd = String(theirProcess.env.INIT_CWD);
    // if (!initCwd || initCwd === 'undefined') {
    //   // throw new Error('Missing `process.env.INIT_CWD`');
    // }
    // const describeName = filename.replace(initCwd, '');
};
const defaultUseCase = {};
const defaultUseCases = { default: defaultUseCase };
const runner = ({ filename, Component, 
// process: theirProcess,
useCases: useCasesProp, }) => {
    const foo = (0, react_2.storiesOf)('Button', module);
    const Foo = () => react_1.default.createElement("div", null, "kldskjsflk");
    foo.add('hello', () => react_1.default.createElement(Foo, null));
};
exports.runner = runner;
//# sourceMappingURL=index.js.map