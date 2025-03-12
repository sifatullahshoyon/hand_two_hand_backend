"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidation = void 0;
const zod_1 = require("zod");
const productValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        required_error: 'Product Name is required',
        invalid_type_error: 'Product Name must be a string',
    })
        .min(3, { message: 'Name must be at least 3 characters long' })
        .trim(),
    brand: zod_1.z.string({ required_error: 'Brand Name is required' }).trim(),
    categories: zod_1.z
        .string({ required_error: 'Categories Name is required' })
        .trim(),
    price: zod_1.z
        .number({
        required_error: 'Price is required',
        invalid_type_error: 'Price must be a number',
    })
        .int({ message: 'Price must be an integer' })
        .positive({ message: 'Price must be a positive number' }),
    description: zod_1.z.string({ required_error: 'Description is required' }).trim(),
    image: zod_1.z.string({ required_error: 'Product Photo is required' }).optional(),
});
exports.productValidation = {
    productValidationSchema,
};
