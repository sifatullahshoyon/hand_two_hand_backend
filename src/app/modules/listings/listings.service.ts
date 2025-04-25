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
): Promise<{
  data: IListing[];
  meta: { total: number; page: number; limit: number; totalPage: number };
}> => {
  const searchableFields = [
    'title',
    'price',
    'category',
    'condition',
    'location',
  ];

  const queryBuilder = new QueryBuilder(ListingModel.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .select();

  const listings = await queryBuilder.modelQuery; // Get the listings
  const total = await ListingModel.countDocuments(queryBuilder.filterQuery); // Use the filterQuery property

  // Ensure `page` and `limit` are valid numbers
  const page =
    query.page && !isNaN(Number(query.page)) ? Number(query.page) : 1;
  const limit =
    query.limit && !isNaN(Number(query.limit)) ? Number(query.limit) : 20;

  const totalPage = Math.ceil(total / limit); // Calculate total pages

  return {
    data: listings,
    meta: {
      total,
      page,
      limit,
      totalPage, // Include total pages in the metadata
    },
  };
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
