import { Schema, Types, model } from 'mongoose';
import { ITransaction } from './transaction.interface';

const transactionSchema = new Schema<ITransaction>(
  {
    buyerID: { type: Types.ObjectId, ref: 'User', required: true },
    sellerID: { type: Types.ObjectId, ref: 'User', required: true },
    itemID: { type: Types.ObjectId, ref: 'Item', required: true },
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

// const TransactionModel = mongoose.model<ITransaction & Document>(
//   'Transaction',
//   transactionSchema,
// );

// export default TransactionModel;

// Transaction Model
const TransactionModel = model<ITransaction>('Transaction', transactionSchema);

export default TransactionModel;
