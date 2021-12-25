"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const stripeSize = 3;
const Base = ({ isSide }) => (react_1.default.createElement("div", { style: {
        backgroundImage: `repeating-linear-gradient(
        -55deg,
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.5) ${stripeSize}px,
        #fff ${stripeSize}px,
        #fff ${stripeSize * 2}px
      )`,
        height: 50,
        opacity: 0.5,
        width: 50,
        display: isSide ? 'inline-block' : 'block',
        boxShadow: '0 0 0 5px inset rgba(0, 0, 0, 0.5)',
    } }));
exports.default = Base;
//# sourceMappingURL=bounding-box.js.map