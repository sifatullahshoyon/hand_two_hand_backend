"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
const http_status_codes_1 = require("http-status-codes");
const handleZodError = (err, res) => {
    var _a;
    const issues = (_a = err === null || err === void 0 ? void 0 : err.issues) === null || _a === void 0 ? void 0 : _a.map((item) => {
        return {
            path: item.path.join('>'),
            message: item.message,
        };
    });
    res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
        success: false,
        message: err.message,
        issues,
        err,
        stack: err.stack,
    });
};
exports.handleZodError = handleZodError;
