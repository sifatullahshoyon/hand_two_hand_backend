import { z } from 'zod';

// Validation for creating a transaction
export const createTransactionBody = z.object({
  buyerID: z.string().min(1, 'Buyer ID is required'), // Validate as a non-empty string
  sellerID: z.string().min(1, 'Seller ID is required'), // Validate as a non-empty string
  itemID: z.string().min(1, 'Item ID is required'), // Validate as a non-empty string
  status: z.enum(['pending', 'completed']).optional(), // Optional, defaults to 'pending'
});

// Validation for updating the transaction status
export const updateTransactionStatusBody = z.object({
  status: z.enum(['pending', 'completed']), // Only 'pending' or 'completed' are allowed
});

// Validation for transaction query parameters (e.g., filtering by buyerID or sellerID)
export const transactionQueryParams = z.object({
  buyerID: z.string().optional(), // Optional query parameter
  sellerID: z.string().optional(), // Optional query parameter
  status: z.enum(['pending', 'completed']).optional(), // Optional query parameter
});

// Infer TypeScript types from the Zod schemas
export type CreateTransactionBody = z.infer<typeof createTransactionBody>;
export type UpdateTransactionStatusBody = z.infer<
  typeof updateTransactionStatusBody
>;
export type TransactionQueryParams = z.infer<typeof transactionQueryParams>;
