"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionQueryParams = exports.updateTransactionStatusBody = exports.createTransactionBody = void 0;
const zod_1 = require("zod");
// Validation for creating a transaction
exports.createTransactionBody = zod_1.z.object({
    buyerID: zod_1.z.string().min(1, 'Buyer ID is required'),
    sellerID: zod_1.z.string().min(1, 'Seller ID is required'),
    itemID: zod_1.z.string().min(1, 'Item ID is required'),
    status: zod_1.z.enum(['pending', 'completed']).optional(),
});
// Validation for updating the transaction status
exports.updateTransactionStatusBody = zod_1.z.object({
    status: zod_1.z.enum(['pending', 'completed']),
});
// Validation for transaction query parameters (e.g., filtering by buyerID or sellerID)
exports.transactionQueryParams = zod_1.z.object({
    buyerID: zod_1.z.string().optional(),
    sellerID: zod_1.z.string().optional(),
    status: zod_1.z.enum(['pending', 'completed']).optional(),
});
