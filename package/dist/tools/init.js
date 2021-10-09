"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
const async_loop_1 = __importDefault(require("../utils/async-loop"));
const fileName = '__automated';
const templateDirName = '__automated__';
const absLibTemplateDir = path_1.default.join(__dirname, '../template');
const absProjectRootDir = path_1.default.join(__dirname, '../../../../../');
const absProjectTestFiles = glob_1.default.sync(`${absProjectRootDir}/**/${fileName}.*`);
const libMeta = require(path_1.default.join(absLibTemplateDir, 'index.json'));
const libVersion = libMeta.version;
(0, async_loop_1.default)(absProjectTestFiles, (file) => {
    const absComponentDir = file.substr(0, file.indexOf(fileName));
    const absAutomatedDir = path_1.default.join(absComponentDir, templateDirName);
    const absReadMe = path_1.default.join(absAutomatedDir, 'README.md');
    const absConfig = path_1.default.join(absAutomatedDir, 'index.json');
    if ((0, fs_extra_1.pathExistsSync)(absAutomatedDir) &&
        (!(0, fs_extra_1.pathExistsSync)(absReadMe) || libVersion > require(absConfig).version)) {
        (0, fs_extra_1.readdirSync)(absAutomatedDir).forEach((file) => {
            if (file !== 'foo') {
                (0, fs_extra_1.rmSync)(path_1.default.join(absAutomatedDir, file));
            }
        });
    }
    (0, fs_extra_1.copySync)(absLibTemplateDir, absAutomatedDir, {
        overwrite: true,
    });
    (0, fs_extra_1.writeFileSync)(path_1.default.join(absAutomatedDir, '/.gitignore'), ['index.stories.tsx', 'index.test.tsx', 'README.md'].join('\n'));
});
//# sourceMappingURL=init.js.map