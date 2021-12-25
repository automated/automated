"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_by_string_1 = __importDefault(require("uuid-by-string"));
const defaults = {
    // desktop
    viewport: {
        deviceScaleFactor: 2,
        height: 768,
        width: 1080,
    },
    screenshotOptions: {
        omitBackground: true,
    },
    matchImageSnapshotOptions: {
        failureThreshold: 0.01,
        failureThresholdType: 'percent',
    },
};
const configs = [
    defaults,
    {
        ...defaults,
        viewport: {
            deviceScaleFactor: 2,
            width: 375,
            height: 812,
            isMobile: true,
            hasTouch: true,
        },
    },
];
const out = configs.reduce((acc, config) => {
    acc[(0, uuid_by_string_1.default)(JSON.stringify(config))] = config;
    return acc;
}, {});
exports.default = out;
//# sourceMappingURL=screenshot-configs.js.map