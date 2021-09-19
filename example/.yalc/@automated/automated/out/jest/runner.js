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
const derive_describe_name_1 = __importDefault(require("./utils/derive-describe-name"));
const jest_1 = __importDefault(require("./jest"));
__exportStar(require("./types"), exports);
const defaultUseCase = {};
const defaultUseCases = { default: defaultUseCase };
const runner = ({ dirname, Component, useCases: useCasesProp, }) => {
    const describeName = (0, derive_describe_name_1.default)({ dirname });
    const useCases = useCasesProp || defaultUseCases;
    const isJest = process.env.IS_JEST === 'true';
    const isStorybook = !!process.env.STORYBOOK_IS_STORYBOOK;
    (0, jest_1.default)({
        Component,
        describeName,
        useCases,
    });
};
exports.runner = runner;
//# sourceMappingURL=runner.js.map