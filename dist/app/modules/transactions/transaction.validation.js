"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionSchema = void 0;
const zod_1 = require("zod");
// MongoDB ObjectId validation regex
const objectIdSchema = zod_1.z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId');
exports.transactionSchema = zod_1.z.object({
    buyerID: objectIdSchema,
    sellerID: objectIdSchema,
    itemID: objectIdSchema,
    status: zod_1.z.enum(['pending', 'completed']),
});
