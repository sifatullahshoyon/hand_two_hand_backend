import { Router } from 'express';
import { transactionController } from './transaction.controller';
import validateRequest from '../../../middlewares/validateRequest';
import { transactionSchema } from './transaction.validation';

const transactionRouter = Router();

// Create a new transaction
transactionRouter.post(
  '/',
  validateRequest(transactionSchema),
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
transactionRouter.put('/:id', transactionController.updateTransactionStatus);

export default transactionRouter;
