"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base = ({ dirname }) => {
    const pwd = process.env.PWD;
    if (pwd)
        return dirname.replace(pwd, '');
    return dirname;
};
exports.default = base;
//# sourceMappingURL=derive-describe-name.js.map