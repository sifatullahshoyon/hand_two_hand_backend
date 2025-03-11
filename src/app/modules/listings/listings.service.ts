import { IListing } from './listings.interface';
import ListingModel from './listings.model';

const createListingIntoDB = async (
  listingData: IListing,
): Promise<IListing> => {
  const newListing = new ListingModel(listingData);
  await newListing.save();
  return newListing;
};

const getAllListings = async (): Promise<IListing[]> => {
  return await ListingModel.find();
};

const getListingById = async (id: string): Promise<IListing | null> => {
  return await ListingModel.findById(id);
};

const updateListing = async (
  id: string,
  data: Partial<IListing>,
): Promise<IListing | null> => {
  return await ListingModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteListing = async (id: string): Promise<void> => {
  await ListingModel.findByIdAndDelete(id);
};

export const listingService = {
  createListingIntoDB,
  getAllListings,
  getListingById,
  updateListing,
  deleteListing,
};
