"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@storybook/react");
const react_2 = __importDefault(require("react"));
const base = ({ useCases, Component, describeName, }) => {
    const foo = (0, react_1.storiesOf)('Button', module);
    const Foo = () => react_2.default.createElement("div", null, "kldskjsflk");
    foo.add('hello', () => react_2.default.createElement(Foo, null));
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
//# sourceMappingURL=storybook2.js.map