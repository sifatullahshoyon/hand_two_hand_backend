import { Schema, model } from 'mongoose';
import { ITransaction } from './transaction.interface';

const transactionSchema = new Schema<ITransaction>({
  buyerID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  sellerID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  itemID: { type: Schema.Types.ObjectId, ref: 'Listing', required: true },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
  },
  soldPrice: { type: Number, required: true },
  // paymentMethod: { type: String },
  // createdAt: { type: Date, default: Date.now },
});

export default model<ITransaction>('Transaction', transactionSchema);
