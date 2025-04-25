"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidationSchema = void 0;
const zod_1 = require("zod");
const createOrderValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        listings: zod_1.z.array(zod_1.z.object({
            listing: zod_1.z.string(),
            quantity: zod_1.z.number().int().min(1, 'Quantity must be at least 1'),
        })),
        totalAmount: zod_1.z.number().optional(),
        status: zod_1.z
            .enum(['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'])
            .default('Pending'),
        orderDate: zod_1.z.string().optional(),
    }),
});
exports.OrderValidationSchema = {
    createOrderValidationSchema,
};
