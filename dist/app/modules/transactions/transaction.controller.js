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
exports.transactionController = void 0;
const http_status_codes_1 = require("http-status-codes");
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const transactions_service_1 = require("./transactions.service");
// Create a new transaction
const createTransaction = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield transactions_service_1.transactionService.createTransactionIntoDb(req.body);
    (0, sendResponse_1.default)(res, {
        message: 'Transaction created successfully',
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        data: transaction,
    });
}));
// Get purchase history
const getPurchasesHistory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const purchases = yield transactions_service_1.transactionService.getPurchasesFromDb(req.params.userId);
    (0, sendResponse_1.default)(res, {
        message: 'Purchase history retrieved successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: purchases,
    });
}));
// Get sales history
const getSalesHistory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sales = yield transactions_service_1.transactionService.getSalesFromDb(req.params.userId);
    (0, sendResponse_1.default)(res, {
        message: 'Sales history retrieved successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: sales,
    });
}));
// Update transaction status
const updateTransactionStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedTransaction = yield transactions_service_1.transactionService.updateTransactionStatusInDb(req.params.id, req.body.status);
    (0, sendResponse_1.default)(res, {
        message: 'Transaction status updated successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: updatedTransaction,
    });
}));
exports.transactionController = {
    createTransaction,
    getPurchasesHistory,
    getSalesHistory,
    updateTransactionStatus,
};
