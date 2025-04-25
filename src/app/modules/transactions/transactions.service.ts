import mongoose from 'mongoose';
import { ITransaction } from './transaction.interface';
import TransactionModel from './transaction.model';

// Create a new transaction

// const createTransactionIntoDb = async (
//   payload: ITransaction,
// ): Promise<ITransaction> => {
//   const transactionData = {
//     ...payload,
//     buyerID: new mongoose.Types.ObjectId(payload.buyerID),
//     sellerID: new mongoose.Types.ObjectId(payload.sellerID),
//     itemID: new mongoose.Types.ObjectId(payload.itemID),
//   };

//   return await TransactionModel.create(transactionData);
// };

const createTransactionIntoDb = async (
  payload: ITransaction,
): Promise<ITransaction> => {
  const transactionData = {
    ...payload,
    buyerID: payload.buyerID,
    sellerID: payload.sellerID,
    itemID: payload.itemID,
  };

  return await TransactionModel.create(transactionData);
};

// Get all purchases for a user
const getPurchasesFromDb = async (userId: string) => {
  return await TransactionModel.find({
    buyerID: new mongoose.Types.ObjectId(userId),
  });
};

// Get all sales for a user
const getSalesFromDb = async (userId: string) => {
  return await TransactionModel.find({
    sellerID: new mongoose.Types.ObjectId(userId),
  });
};

// Update transaction status
const updateTransactionStatusInDb = async (
  id: string,
  status: 'pending' | 'completed',
) => {
  return await TransactionModel.findByIdAndUpdate(
    id,
    { status },
    { new: true },
  );
};

export const transactionService = {
  createTransactionIntoDb,
  getPurchasesFromDb,
  getSalesFromDb,
  updateTransactionStatusInDb,
};
