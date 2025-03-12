"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_controller_1 = require("./transaction.controller");
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const transaction_validation_1 = require("./transaction.validation");
const transactionRouter = (0, express_1.Router)();
// Create a new transaction
transactionRouter.post('/', (0, validateRequest_1.default)(transaction_validation_1.transactionSchema), transaction_controller_1.transactionController.createTransaction);
// Get purchase history
transactionRouter.get('/purchases/:userId', transaction_controller_1.transactionController.getPurchasesHistory);
// Get sales history
transactionRouter.get('/sales/:userId', transaction_controller_1.transactionController.getSalesHistory);
// Update transaction status
transactionRouter.put('/:id', transaction_controller_1.transactionController.updateTransactionStatus);
exports.default = transactionRouter;
