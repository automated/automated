"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base = ({ dirname }) => {
    const absPrefix = __dirname.substr(0, __dirname.indexOf('node_modules') - 1);
    if (__dirname)
        return dirname.replace(absPrefix, '');
    return dirname;
};
exports.default = base;
//# sourceMappingURL=derive-describe-name.js.map