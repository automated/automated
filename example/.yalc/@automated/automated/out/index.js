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
const derive_describe_name_1 = __importDefault(require("./utils/derive-describe-name"));
// const fooModule = module;
const defaultUseCase = {};
const defaultUseCases = { default: defaultUseCase };
const runner = ({ dirname, Component, useCases: useCasesProp, }) => {
    const describeName = (0, derive_describe_name_1.default)({ dirname });
    const useCases = useCasesProp || defaultUseCases;
    const isJest = !!process.env.IS_JEST;
    const isStorybook = !!process.env.STORYBOOK_IS_STORYBOOK;
    if (isStorybook) {
        (0, storybook_1.default)({
            Component,
            describeName,
            useCases,
        });
    }
};
exports.runner = runner;
//   /*
//     Storybook is super brittle – I’m having to do back-flips to make it work.
//     Here are some notes:
//     - env must be prefixed with `STORYBOOK_` otherwise it’s just blown away.
//     - I cannot figure out how to get `storiesOf` to run in another file, so it
//       needs to be inlined here
//     - Dynamic story support is being dropped for no reason.
//       See https://github.com/ComponentDriven/csf/issues/26
//   */
//   // storybookRunner(module);
//   const foo = storiesOf('Button', module);
//   const Foo = () => <div>kldskjsflk</div>;
//   foo.add('hello', () => <Foo />);
//   // Object.entries(useCases).forEach(([key, value]) => {
//   //   const { props } = value;
//   //   console.log(key, value);
//   //   foo.add(key, () => (
//   //     <Wrapper>
//   //       <Component {...props} />
//   //     </Wrapper>
//   //   ));
//   // });
//   // }
//   // if (isJest) {
//   // jestRunner({
//   //   Component,
//   //   describeName,
//   //   useCases,
//   // });
//   // }
// };
__exportStar(require("./types"), exports);
//# sourceMappingURL=index.js.map