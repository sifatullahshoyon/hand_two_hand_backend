import { Router } from 'express';
import { transactionController } from './transaction.controller';

const transactionRouter = Router();

// Create a new transaction
transactionRouter.post(
  '/transactions',
  transactionController.createTransaction,
);

// Get purchase history
transactionRouter.get(
  '/purchases/:userId',
  transactionController.getPurchasesHistory,
);

// Get sales history
transactionRouter.get('/sales/:userId', transactionController.getSalesHistory);

// Update transaction status
transactionRouter.put(
  '/transactions/:id',
  transactionController.updateTransactionStatus,
);

export default transactionRouter;
