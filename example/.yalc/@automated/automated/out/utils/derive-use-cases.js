"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base = ({ useCases: useCasesProp }) => {
    return (useCasesProp || [
        {
            name: 0,
            props: {},
        },
    ]).map((item, key) => {
        return {
            ...item,
            name: `test-${key + 1}`,
        };
    });
};
exports.default = base;
//# sourceMappingURL=derive-use-cases.js.map