import QueryBuilder from '../../../builder/queryBuilder';
import { IProduct } from './items.interface';
import { ProductModel } from './items.model';

// create product
const createProductIntoDB = async (payload: IProduct): Promise<IProduct> => {
  const result = await ProductModel.create(payload);

  return result;
};

// get all products:-
const getAllProductsFromDb = async (query: Record<string, unknown>) => {
  const searchableFields = ['name', 'brand', 'category'];

  const products = new QueryBuilder(ProductModel.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .select();

  const result = await products.modelQuery;

  return result;
};

// get single product
const getSingleProductFromDb = async (productId: string) => {
  const result = await ProductModel.findById(productId);
  return result;
};

// product update
const updateProductIntoDB = async (
  productId: string,
  data: Partial<IProduct>,
) => {
  const result = await ProductModel.findByIdAndUpdate(productId, data, {
    new: true,
  });

  return result;
};

// delete product
const deleteProductFromDb = async (productId: string) => {
  const result = await ProductModel.findByIdAndDelete(productId, { new: true });

  return result;
};

export const productService = {
  createProductIntoDB,
  getAllProductsFromDb,
  getSingleProductFromDb,
  updateProductIntoDB,
  deleteProductFromDb,
};
