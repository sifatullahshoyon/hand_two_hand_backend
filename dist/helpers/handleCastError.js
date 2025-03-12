"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCastError = void 0;
const http_status_codes_1 = require("http-status-codes");
const handleCastError = (err, res) => {
    res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
        success: false,
        message: err.message,
        err,
        stack: err.stack,
    });
};
exports.handleCastError = handleCastError;
