import { ITransaction } from '../transactions/transaction.interface';
import transactionModel from '../transactions/transaction.model';

const getSalesHistory = async (sellerID: string): Promise<ITransaction[]> => {
  const result = await transactionModel
    .find({ sellerID })
    .populate('buyerID', 'name email phone')
    .populate('itemID', 'title price images')
    .sort({ createdAt: -1 });

  return result;
};

const updateTransactionStatus = async (
  transactionID: string,
  status: string,
): Promise<ITransaction | null> => {
  const validStatuses = ['pending', 'completed', 'cancelled', 'disputed'];
  if (!validStatuses.includes(status)) {
    throw new Error('Invalid status');
  }

  const result = await transactionModel
    .findByIdAndUpdate(transactionID, { status }, { new: true })
    .populate('buyerID', 'name email');

  return result;
};

const getTransactionById = async (
  transactionID: string,
): Promise<ITransaction | null> => {
  const result = await transactionModel
    .findById(transactionID)
    .populate('buyerID', 'name email phone')
    .populate('sellerID', 'name email')
    .populate('itemID', 'title price images description');

  if (!result) {
    throw new Error('Transaction not found');
  }

  return result;
};

export const salesService = {
  getSalesHistory,
  updateTransactionStatus,
  getTransactionById,
};
