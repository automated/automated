"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@storybook/react");
const react_2 = __importDefault(require("react"));
// const base = ({
//   useCases,
//   Component,
//   describeName,
// }: {
//   useCases: UseCases;
//   Component: React.ElementType;
//   describeName: string;
// }) => {
const base = (fooModule) => {
    const Button = () => react_2.default.createElement("div", null, "fffkldskjsflk");
    (0, react_1.storiesOf)('Button', fooModule).add('with text', () => react_2.default.createElement(Button, null));
    // const foo = storiesOf('Button', module);
    // const Foo = () => <div>kldskjsflk</div>;
    // foo.add('hello', () => <Foo />);
    // const foo = storiesOf('Button', module);
    // Object.entries(useCases).forEach(([key, value]) => {
    //   const { props } = value;
    //   console.log(key, value);
    //   foo.add(key, () => (
    //     <Wrapper>
    //       <Component {...props} />
    //     </Wrapper>
    //   ));
    // });
};
exports.default = base;
//# sourceMappingURL=storybook.js.map