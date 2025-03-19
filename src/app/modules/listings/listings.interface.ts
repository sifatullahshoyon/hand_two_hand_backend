import mongoose from 'mongoose';

export interface IListing {
  title: string;
  description: string;
  price: string;
  condition: 'brandNew' | 'gentlyUsed' | 'fairCondition' | 'goodCondition';
  images: string;
  userID?: mongoose.Schema.Types.ObjectId; // Reference to user identifier
  status: 'available' | 'sold';
  color: string;
  availability: 'in stock' | 'out of stock';
}
