import { model, Schema, Types } from 'mongoose';
import { IListing } from './listings.interface';

// Listing Schema
const listingSchema = new Schema<IListing>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      minlength: [3, 'Title must be at least 3 characters long'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [10, 'Description must be at least 10 characters long'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
    },
    condition: {
      type: String,
      required: [true, 'Condition is required'],
    },
    images: {
      type: [String],
      default: [],
    },
    userID: {
      type: Types.ObjectId,
      required: [true, 'User ID is required'],
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['available', 'sold'],
      default: 'available',
    },
  },
  {
    timestamps: true,
  },
);

// Listing Model
const ListingModel = model<IListing>('Listing', listingSchema);

export default ListingModel;
