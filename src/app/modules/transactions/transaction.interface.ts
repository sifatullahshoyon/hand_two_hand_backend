import { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  buyerID: Schema.Types.ObjectId;
  sellerID: Schema.Types.ObjectId;
  itemID: Schema.Types.ObjectId;
  status: 'pending' | 'completed' | 'cancelled';
  soldPrice: number;
  paymentMethod?: string;
  createdAt?: Date;
}
