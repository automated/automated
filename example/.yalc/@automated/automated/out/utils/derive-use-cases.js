"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base = ({ useCases }) => {
    const defaultUseCase = {};
    const defaultUseCases = { default: defaultUseCase };
    return useCases || defaultUseCases;
};
exports.default = base;
//# sourceMappingURL=derive-use-cases.js.map