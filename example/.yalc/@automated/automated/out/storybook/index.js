"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runner = void 0;
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
//# sourceMappingURL=index.js.map