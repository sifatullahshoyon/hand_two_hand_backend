import sendResponse from '../../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import { Request, Response } from 'express';
import { listingService } from './listings.service';

const createListing = catchAsync(async (req: Request, res: Response) => {
  const listingData = req.body;

  const result = await listingService.createListingIntoDB(listingData);

  sendResponse(res, {
    message: 'Listing created successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const getListings = catchAsync(async (req: Request, res: Response) => {
  const result = await listingService.getAllListings();

  sendResponse(res, {
    message: 'Listings retrieved successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const getListingById = catchAsync(async (req: Request, res: Response) => {
  const result = await listingService.getListingById(req.params.id);

  sendResponse(res, {
    message: 'Listing retrieved successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const updateListing = catchAsync(async (req: Request, res: Response) => {
  const result = await listingService.updateListing(req.params.id, req.body);

  sendResponse(res, {
    message: 'Listing updated successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

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
