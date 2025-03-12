"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Listing Schema
const listingSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Types.ObjectId,
        required: [true, 'User ID is required'],
        ref: 'User',
    },
    status: {
        type: String,
        enum: ['available', 'sold'],
        default: 'available',
    },
}, {
    timestamps: true,
});
// Listing Model
const ListingModel = (0, mongoose_1.model)('Listing', listingSchema);
exports.default = ListingModel;
