"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = __importDefault(require("glob"));
const automatedFileName = '__automated.tsx';
const scoutGlob = glob_1.default.sync(`./**/${automatedFileName}`);
const siblings = scoutGlob.map((x) => x.replace(automatedFileName, '*.{ts,tsx,js,jsx}'));
const siblingsGlob = siblings.map((x) => glob_1.default.sync(x).filter((a) => a.indexOf(automatedFileName) === -1));
const collectCoverageFrom = siblingsGlob.flat();
const config = {
    reporters: [
        'default',
        'jest-image-snapshot/src/outdated-snapshot-reporter.js',
    ],
    coverageDirectory: './tmp/automated/coverage',
    collectCoverageFrom,
    moduleNameMapper: {
        '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
    },
    snapshotSerializers: ['@emotion/jest/serializer'],
    testEnvironment: 'jsdom',
};
exports.default = config;
//# sourceMappingURL=jest.config.js.map