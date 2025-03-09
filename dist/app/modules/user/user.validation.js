"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        required_error: 'Name must be provided and must be a string',
    })
        .min(3)
        .max(50),
    email: zod_1.z
        .string({
        required_error: 'Email must be provided and must be a string',
    })
        .email('Invalid email address'),
    password: zod_1.z
        .string({
        required_error: 'Password is required for your safety',
    })
        .max(20, { message: 'Password can not be more than 20 characters' }),
    phoneNumber: zod_1.z.string().regex(/^\+?[1-9]\d{1,14}$/, {
        message: 'Invalid phone number',
    }),
    photo: zod_1.z
        .string({
        required_error: 'Photo must be provided and must be a string',
    })
        .optional(),
});
exports.userValidation = {
    userValidationSchema,
};
