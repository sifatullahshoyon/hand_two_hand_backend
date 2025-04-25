"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const transactionSchema = new mongoose_1.Schema({
    buyerID: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    sellerID: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    itemID: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Listing', required: true },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending',
    },
    soldPrice: { type: Number, required: true },
    // paymentMethod: { type: String },
    // createdAt: { type: Date, default: Date.now },
});
exports.default = (0, mongoose_1.model)('Transaction', transactionSchema);
