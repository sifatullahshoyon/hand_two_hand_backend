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
exports.salesService = void 0;
const transaction_model_1 = __importDefault(require("../transactions/transaction.model"));
const getSalesHistory = (sellerID) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield transaction_model_1.default
        .find({ sellerID })
        .populate('buyerID', 'name email phone')
        .populate('itemID', 'title price images')
        .sort({ createdAt: -1 });
    return result;
});
const updateTransactionStatus = (transactionID, status) => __awaiter(void 0, void 0, void 0, function* () {
    const validStatuses = ['pending', 'completed', 'cancelled', 'disputed'];
    if (!validStatuses.includes(status)) {
        throw new Error('Invalid status');
    }
    const result = yield transaction_model_1.default
        .findByIdAndUpdate(transactionID, { status }, { new: true })
        .populate('buyerID', 'name email');
    return result;
});
const getTransactionById = (transactionID) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield transaction_model_1.default
        .findById(transactionID)
        .populate('buyerID', 'name email phone')
        .populate('sellerID', 'name email')
        .populate('itemID', 'title price images description');
    if (!result) {
        throw new Error('Transaction not found');
    }
    return result;
});
exports.salesService = {
    getSalesHistory,
    updateTransactionStatus,
    getTransactionById,
};
