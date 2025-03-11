import { z } from 'zod';

// Zod Validation Schema
const transactionValidationSchema = z.object({
  buyerID: z
    .string({
      required_error: 'Buyer ID is required',
      invalid_type_error: 'Buyer ID must be a string',
    })
    .regex(/^[0-9a-fA-F]{24}$/, 'Buyer ID must be a valid MongoDB ObjectId'),

  sellerID: z
    .string({
      required_error: 'Seller ID is required',
      invalid_type_error: 'Seller ID must be a string',
    })
    .regex(/^[0-9a-fA-F]{24}$/, 'Seller ID must be a valid MongoDB ObjectId'),

  itemID: z
    .string({
      required_error: 'Item ID is required',
      invalid_type_error: 'Item ID must be a string',
    })
    .regex(/^[0-9a-fA-F]{24}$/, 'Item ID must be a valid MongoDB ObjectId'),

  status: z.enum(['pending', 'completed']).optional(),
});

export const transactionValidation = {
  transactionValidationSchema,
};
