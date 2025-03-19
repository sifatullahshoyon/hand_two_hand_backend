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

  color: z.string({
    required_error: 'Color is required',
    invalid_type_error: 'Color must be a string',
  }),

  price: z.string({
    required_error: 'Price is required',
    invalid_type_error: 'Price must be a string',
  }),
  // .positive('Price must be a positive number')
  // .int(),

  condition: z.enum(
    ['brandNew', 'gentlyUsed', 'fairCondition', 'goodCondition'],
    {
      required_error: 'Condition is required',
    },
  ),

  images: z.string({
    required_error: 'Image is required',
    invalid_type_error: 'Image must be a string',
  }),

  userID: z
    .string({
      required_error: 'User ID is required',
      invalid_type_error: 'User ID must be a string',
    })
    .regex(/^[0-9a-fA-F]{24}$/, 'User ID must be a valid MongoDB ObjectId')
    .optional(),
});

export const listingValidation = {
  listingValidationSchema,
};
