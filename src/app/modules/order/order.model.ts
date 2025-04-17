import mongoose, { Schema } from 'mongoose';
import { IOrder } from './order.interface';

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    listings: [
      {
        listing: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Listing',
        },
        quantity: Number,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    transaction: {
      id: String,
      transactionStatus: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
      bank_status: String,
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;
