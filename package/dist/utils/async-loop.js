"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncLoop = (array, func) => new Promise((resolve) => {
    let index = 0;
    const runner = async () => {
        const item = array[index];
        if (index < array.length) {
            await func(item, index, resolve);
        }
        else {
            resolve(undefined);
            return;
        }
        index += 1;
        await runner();
    };
    runner();
});
exports.default = asyncLoop;
//# sourceMappingURL=async-loop.js.map