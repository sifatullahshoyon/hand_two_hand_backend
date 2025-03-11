import sendResponse from '../../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import { Request, Response } from 'express';
import { sendImageToCloudinary } from '../../../helpers/fileUploadHelper';
import { productService } from './items.service';

// create product
const createProduct = catchAsync(async (req: Request, res: Response) => {
  // const payload = JSON.parse(req.body.data);
  const payload = req.body;

  if (req.file) {
    const imgName = req.file?.filename ? req.file?.filename : 'product img';

    const imageName = imgName;

    const path = req.file.path;

    const { secure_url } = await sendImageToCloudinary(imageName, path);

    payload.image = secure_url;
  }

  // console.log('product controller payload: ', payload);

  const result = await productService.createProductIntoDB(payload);

  sendResponse(res, {
    message: 'Product created successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

// Get All Products
const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await productService.getAllProductsFromDb(req.query);

  sendResponse(res, {
    message: 'All Products retrieved successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

// Get Single Products
const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.productId;

  const result = await productService.getSingleProductFromDb(productId);

  sendResponse(res, {
    message: 'Single Product retrieved successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

// update product
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.productId;

  const data = req.body;

  const result = await productService.updateProductIntoDB(productId, data);

  sendResponse(res, {
    message: 'Product updated successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

// delete product
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.productId;

  await productService.deleteProductFromDb(productId);

  sendResponse(res, {
    message: 'Product deleted successfully',
    statusCode: StatusCodes.OK,
    data: {},
  });
});

export const productController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
