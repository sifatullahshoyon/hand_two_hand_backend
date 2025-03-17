import QueryBuilder from '../../../builder/queryBuilder';
import { IListing } from './listings.interface';
import ListingModel from './listings.model';

const createListingIntoDB = async (
  listingData: IListing,
): Promise<IListing> => {
  const newListing = new ListingModel(listingData);
  await newListing.save();
  return newListing;
};

const getAllListings = async (
  query: Record<string, unknown>,
): Promise<IListing[]> => {
  const searchableFields = [
    'title',
    'price',
    'category',
    'condition',
    'location',
  ];

  const listings = new QueryBuilder(ListingModel.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .select();

  const result = await listings.modelQuery;

  return result;
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
