"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const defaults = {
    props: {
        onClick: () => { },
    },
};
const useCases = [
    defaults,
    {
        name: 'Set text',
        props: {
            ...defaults.props,
            text: 'Hello automated',
        },
    },
    {
        name: 'Set background',
        props: {
            ...defaults.props,
            background: 'green',
        },
    },
];
exports.default = {
    dirname: __dirname,
    Component: _1.default,
    useCases,
};
//# sourceMappingURL=__automated.js.map