import mongoose from 'mongoose';

export interface ITransaction {
  buyerID: mongoose.Schema.Types.ObjectId;
  sellerID: mongoose.Schema.Types.ObjectId;
  itemID: mongoose.Schema.Types.ObjectId;
  status: 'pending' | 'completed';
}
