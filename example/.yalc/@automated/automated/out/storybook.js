"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@storybook/react");
const react_2 = __importDefault(require("react"));
const wrapper_1 = __importDefault(require("./storybook/wrapper"));
const base = ({ useCases, Component, describeName, }) => {
    // const base = (fooModule: any) => {
    // const Button = () => <div>fffkldskjsflk</div>;
    // storiesOf(describeName, module).add('with text', () => <Component />);
    // const foo = storiesOf('Button', module);
    // const Foo = () => <div>kldskjsflk</div>;
    // foo.add('hello', () => <Foo />);
    const foo = (0, react_1.storiesOf)(describeName, module);
    Object.entries(useCases).forEach(([key, value]) => {
        const { props } = value;
        console.log(key, value);
        foo.add(key, () => (react_2.default.createElement(wrapper_1.default, null,
            react_2.default.createElement(Component, { ...props }))));
    });
};
exports.default = base;
//# sourceMappingURL=storybook.js.map