"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
// Create a Schema corresponding to the document interface.
const productSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
// Create a Model
exports.ProductModel = (0, mongoose_1.model)('Product', productSchema);
