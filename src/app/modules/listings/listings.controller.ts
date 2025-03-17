import sendResponse from '../../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import { Request, Response } from 'express';
import { listingService } from './listings.service';

// create listings
const createListing = catchAsync(async (req: Request, res: Response) => {
  const listingData = req.body;

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
