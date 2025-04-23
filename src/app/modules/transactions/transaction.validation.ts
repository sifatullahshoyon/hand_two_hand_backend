import { z } from 'zod';

// MongoDB ObjectId validation regex
const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId');

export const transactionSchema = z.object({
  buyerID: objectIdSchema,
  sellerID: objectIdSchema,
  itemID: objectIdSchema,
  status: z.enum(['pending', 'completed']),
  soldPrice: z.number().positive(),
});
