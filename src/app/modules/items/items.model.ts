import { model, Schema } from 'mongoose';
import { IProduct } from './items.interface';

// Create a Schema corresponding to the document interface.
const productSchema: Schema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product Name is Required'],
      trim: true,
      minLength: 3,
      lowercase: true,
    },
    brand: {
      type: String,
      required: [true, 'Brand Name is Required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product Price is Required'],
      min: [1, 'Price must be a positive number'],
    },
    categories: {
      type: String,
      required: [true, 'Category is Required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Product Image is required'],
    },
  },
  { timestamps: true },
);

// Create a Model
export const ProductModel = model<IProduct>('Product', productSchema);
