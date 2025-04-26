import sendResponse from '../../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import { Request, Response } from 'express';
import { listingService } from './listings.service';
import mongoose from 'mongoose';
import { IListing } from './listings.interface';

// create listings
const createListing = catchAsync(async (req: Request, res: Response) => {
  const {
    title,
    description,
    price,
    condition,
    images,
    status,
    color,
    availability,
    category,
  } = req.body;

  // Authentication middleware থেকে userId পাওয়া যাচ্ছে
  const userID = new mongoose.Types.ObjectId(
    req.body.userID,
  ) as unknown as mongoose.Schema.Types.ObjectId;
  // ✅ ObjectId-তে রূপান্তর

  const listingData: IListing = {
    title,
    description,
    price,
    condition,
    images,
    userID,
    status,
    color,
    availability,
    category,
  };

  const result = await listingService.createListingIntoDB(listingData);

  sendResponse(res, {
    message: 'Listing created successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

// get all listings
const getListings = catchAsync(async (req: Request, res: Response) => {
  const result = await listingService.getAllListings(req.query);

  sendResponse(res, {
    message: 'All Listings retrieved successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

// get single listing

const getListingById = catchAsync(async (req: Request, res: Response) => {
  const result = await listingService.getListingById(req.params.id);

  sendResponse(res, {
    message: 'Single Listing retrieved successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

// update listing
const updateListing = catchAsync(async (req: Request, res: Response) => {
  const result = await listingService.updateListing(req.params.id, req.body);

  sendResponse(res, {
    message: 'Listing updated successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

// delete listing
const deleteListing = catchAsync(async (req: Request, res: Response) => {
  await listingService.deleteListing(req.params.id);

  sendResponse(res, {
    message: 'Listing deleted successfully',
    statusCode: StatusCodes.OK,
    data: {},
  });
});

export const listingController = {
  createListing,
  getListings,
  getListingById,
  updateListing,
  deleteListing,
};
