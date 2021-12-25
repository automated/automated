"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Base = ({ background, text, onClick }) => (React.createElement("button", { onClick: onClick, css: {
        background: background || 'blue',
        border: 'none',
        borderRadius: 10,
        color: 'white',
        fontSize: 20,
        fontWeight: 600,
        padding: '20px 30px',
    } }, text || 'Get started'));
exports.default = Base;
//# sourceMappingURL=index.js.map