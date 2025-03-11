import { z } from 'zod';

const productValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Product Name is required',
      invalid_type_error: 'Product Name must be a string',
    })
    .min(3, { message: 'Name must be at least 3 characters long' })
    .trim(),

  brand: z.string({ required_error: 'Brand Name is required' }).trim(),
  categories: z
    .string({ required_error: 'Categories Name is required' })
    .trim(),

  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .int({ message: 'Price must be an integer' })
    .positive({ message: 'Price must be a positive number' }),

  description: z.string({ required_error: 'Description is required' }).trim(),

  image: z.string({ required_error: 'Product Photo is required' }).optional(),
});

export const productValidation = {
  productValidationSchema,
};
