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
exports.transactionService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const transaction_model_1 = __importDefault(require("./transaction.model"));
// Create a new transaction
const createTransactionIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionData = Object.assign(Object.assign({}, payload), { buyerID: new mongoose_1.default.Types.ObjectId(payload.buyerID), sellerID: new mongoose_1.default.Types.ObjectId(payload.sellerID), itemID: new mongoose_1.default.Types.ObjectId(payload.itemID) });
    return yield transaction_model_1.default.create(transactionData);
});
// Get all purchases for a user
const getPurchasesFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield transaction_model_1.default.find({
        buyerID: new mongoose_1.default.Types.ObjectId(userId),
    });
});
// Get all sales for a user
const getSalesFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield transaction_model_1.default.find({
        sellerID: new mongoose_1.default.Types.ObjectId(userId),
    });
});
// Update transaction status
const updateTransactionStatusInDb = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    return yield transaction_model_1.default.findByIdAndUpdate(id, { status }, { new: true });
});
exports.transactionService = {
    createTransactionIntoDb,
    getPurchasesFromDb,
    getSalesFromDb,
    updateTransactionStatusInDb,
};
