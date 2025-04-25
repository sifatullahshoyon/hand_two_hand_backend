import { z } from 'zod';

// Validation for creating a transaction
export const createTransactionBody = z.object({
  buyerID: z.string().min(1, 'Buyer ID is required'),
  sellerID: z.string().min(1, 'Seller ID is required'),
  itemID: z.string().min(1, 'Item ID is required'),
  status: z.enum(['pending', 'completed']).optional(),
});

// Validation for updating the transaction status
export const updateTransactionStatusBody = z.object({
  status: z.enum(['pending', 'completed']),
});

// Validation for transaction query parameters (e.g., filtering by buyerID or sellerID)
export const transactionQueryParams = z.object({
  buyerID: z.string().optional(),
  sellerID: z.string().optional(),
  status: z.enum(['pending', 'completed']).optional(),
});

// Infer TypeScript types from the Zod schemas
export type CreateTransactionBody = z.infer<typeof createTransactionBody>;
export type UpdateTransactionStatusBody = z.infer<
  typeof updateTransactionStatusBody
>;
export type TransactionQueryParams = z.infer<typeof transactionQueryParams>;
