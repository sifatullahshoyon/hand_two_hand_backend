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
exports.userController = void 0;
const http_status_codes_1 = require("http-status-codes");
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const user_service_1 = require("./user.service");
// create user
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield user_service_1.userService.createUserIntoDb(payload, 'user'); // user রোল
    (0, sendResponse_1.default)(res, {
        message: 'User Created successfully',
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        data: result,
    });
}));
// Get Single user
const getSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.userService.getSingleUserFromDb(id);
    (0, sendResponse_1.default)(res, {
        message: 'Single User retrieved successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
// Get update user
const getUpdateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const body = req.body;
    const result = yield user_service_1.userService.userUpdatedFromDb(id, body);
    (0, sendResponse_1.default)(res, {
        message: 'User update  successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
// delete user
const deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield user_service_1.userService.deleteUserFromDb(id);
    (0, sendResponse_1.default)(res, {
        message: 'User update  successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: {},
    });
}));
// Get All user
const getAllUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.getAllUserFromDb();
    (0, sendResponse_1.default)(res, {
        message: 'All User retrieved successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
exports.userController = {
    createUser,
    getSingleUser,
    getUpdateUser,
    deleteUser,
    getAllUser,
};
