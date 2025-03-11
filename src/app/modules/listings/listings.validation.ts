import { z } from 'zod';

// Zod Validation Schema
const listingValidationSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string',
    })
    .min(3, 'Title must be at least 3 characters long'),

  description: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    })
    .min(10, 'Description must be at least 10 characters long'),

  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .positive('Price must be a positive number')
    .int(),

  condition: z.string({
    required_error: 'Condition is required',
    invalid_type_error: 'Condition must be a string',
  }),

  images: z.array(z.string()).optional(),

  userID: z
    .string({
      required_error: 'User ID is required',
      invalid_type_error: 'User ID must be a string',
    })
    .regex(/^[0-9a-fA-F]{24}$/, 'User ID must be a valid MongoDB ObjectId'),

  status: z.enum(['available', 'sold']).optional(),
});

export const listingValidation = {
  listingValidationSchema,
};
