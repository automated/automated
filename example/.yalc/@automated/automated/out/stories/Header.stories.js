"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggedOut = exports.LoggedIn = void 0;
const react_1 = __importDefault(require("react"));
const Header_1 = require("./Header");
exports.default = {
    title: 'Example/Header',
    component: Header_1.Header,
};
const Template = (args) => react_1.default.createElement(Header_1.Header, Object.assign({}, args));
exports.LoggedIn = Template.bind({});
exports.LoggedIn.args = {
    user: {},
};
exports.LoggedOut = Template.bind({});
exports.LoggedOut.args = {};
//# sourceMappingURL=Header.stories.js.map