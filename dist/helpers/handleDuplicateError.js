"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDuplicateError = void 0;
const http_status_codes_1 = require("http-status-codes");
const handleDuplicateError = (err, res) => {
    res.status(http_status_codes_1.StatusCodes.CONFLICT).json({
        success: false,
        message: err.message,
        err,
        stack: err.stack,
    });
};
exports.handleDuplicateError = handleDuplicateError;
