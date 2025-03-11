import { Schema, model } from 'mongoose';
import { ITransaction } from './transaction.interface';

const transactionSchema = new Schema<ITransaction>(
  {
    buyerID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sellerID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    itemID: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
    status: {
      type: String,
      enum: ['pending', 'completed'] as const,
      default: 'pending',
    },
  },
  { timestamps: true },
);

const TransactionModel = model<ITransaction>('Transaction', transactionSchema);

export default TransactionModel;
