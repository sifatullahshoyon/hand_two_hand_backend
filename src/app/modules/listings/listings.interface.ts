import mongoose from 'mongoose';

export interface IListing {
  title: string;
  description: string;
  price: number;
  condition: string;
  images: string[];
  userID: mongoose.Schema.Types.ObjectId; // Reference to user identifier
  status: 'available' | 'sold';
}
