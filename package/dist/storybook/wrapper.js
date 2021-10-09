"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const bounding_box_1 = __importDefault(require("./bounding-box"));
const Base = ({ children }) => {
    return (react_1.default.createElement("section", null,
        react_1.default.createElement(bounding_box_1.default, null),
        react_1.default.createElement(bounding_box_1.default, { isSide: true }),
        children,
        react_1.default.createElement(bounding_box_1.default, { isSide: true }),
        react_1.default.createElement(bounding_box_1.default, null)));
};
exports.default = Base;
//# sourceMappingURL=wrapper.js.map