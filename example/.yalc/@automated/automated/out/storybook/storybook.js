"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runner = void 0;
const storybook_1 = __importDefault(require("./storybook"));
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
console.log(process.env);
const runner = ({ filename, Component, env, useCases: useCasesProp, }) => {
    console.log(process.env);
    const describeName = deriveDescribeName({ filename });
    const useCases = useCasesProp || defaultUseCases;
    // const isJest = !!env.IS_JEST;
    const isStorybook = !!process.env.STORYBOOK_IS_STORYBOOK;
    if (isStorybook) {
        (0, storybook_1.default)({
            Component,
            describeName,
            useCases,
            fooModule: module,
        });
        // const foo = storiesOf('Button', module);
        // const Foo = () => <div>kldskjsflk</div>;
        // foo.add('hello', () => <Foo />);
        // Object.entries(useCases).forEach(([key, value]) => {
        //   const { props } = value;
        //   console.log(key, value);
        //   foo.add(key, () => (
        //     <Wrapper>
        //       <Component {...props} />
        //     </Wrapper>
        //   ));
        // });
    }
    // if (isJest) {
    // jestRunner({
    //   Component,
    //   describeName,
    //   useCases,
    // });
    // }
};
exports.runner = runner;
__exportStar(require("./types"), exports);
//# sourceMappingURL=storybook.js.map