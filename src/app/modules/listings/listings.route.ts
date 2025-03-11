import { Router } from 'express';
import { listingValidation } from './listings.validation';
import { listingController } from './listings.controller';
import validateRequest from '../../../middlewares/validateRequest';
import auth from '../../../middlewares/auth';

const listingRouter = Router();

listingRouter.post(
  '/',
  auth('user', 'admin'),
  validateRequest(listingValidation.listingValidationSchema),
  listingController.createListing,
);

listingRouter.get('/:id', listingController.getListingById);

listingRouter.put(
  '/:id',
  auth('user', 'admin'),
  validateRequest(listingValidation.listingValidationSchema),
  listingController.updateListing,
);

listingRouter.delete(
  '/:id',
  auth('admin', 'user'),
  listingController.deleteListing,
);

listingRouter.get('/', listingController.getListings);

export default listingRouter;
