"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const auth_service_1 = require("./auth.service");
// register
const register = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield auth_service_1.authService.register(payload);
    // console.log(result);
    (0, sendResponse_1.default)(res, {
        message: 'User is registered successfully',
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        data: result,
    });
}));
// login
const login = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield auth_service_1.authService.login(payload);
    // console.log('login result', result);
    (0, sendResponse_1.default)(res, {
        message: 'User is logged in successfully',
        statusCode: http_status_codes_1.StatusCodes.ACCEPTED,
        token: result === null || result === void 0 ? void 0 : result.token,
        data: result === null || result === void 0 ? void 0 : result.verifiedUser,
    });
}));
exports.authController = {
    register,
    login,
};
