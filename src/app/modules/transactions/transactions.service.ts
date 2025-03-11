import { ITransaction } from './transaction.interface';
import TransactionModel from './transaction.model';

// Create a new transaction
const createTransactionIntoDb = async (
  payload: ITransaction,
): Promise<ITransaction> => {
  const result = await TransactionModel.create(payload);
  return result;
};

// Get all purchases for a user
const getPurchasesFromDb = async (userId: string) => {
  const result = await TransactionModel.find({ buyerID: userId });
  return result;
};

// Get all sales for a user
const getSalesFromDb = async (userId: string) => {
  const result = await TransactionModel.find({ sellerID: userId });
  return result;
};

// Update transaction status
const updateTransactionStatusInDb = async (
  id: string,
  status: 'pending' | 'completed',
) => {
  const result = await TransactionModel.findByIdAndUpdate(
    id,
    { status },
    { new: true },
  );
  return result;
};

export const transactionService = {
  createTransactionIntoDb,
  getPurchasesFromDb,
  getSalesFromDb,
  updateTransactionStatusInDb,
};
