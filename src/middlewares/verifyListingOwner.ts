import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import ListingModel from '../app/modules/listings/listings.model';
import catchAsync from '../utils/catchAsync';

const verifyListingOwner = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const listing = await ListingModel.findById(req.params.id);

    if (!listing) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Listing not found' });
      return;
    }

    if (
      req.user?.role !== 'admin' &&
      listing.userID?.toString() !== req.user?.id
    ) {
      res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: 'You do not have permission to modify this listing' });
      return;
    }

    next();
  },
);

export default verifyListingOwner;
