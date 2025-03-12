"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const transactionSchema = new mongoose_1.Schema({
    buyerID: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    sellerID: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    itemID: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Item', required: true },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending',
    },
}, { timestamps: true });
const TransactionModel = (0, mongoose_1.model)('Transaction', transactionSchema);
exports.default = TransactionModel;
