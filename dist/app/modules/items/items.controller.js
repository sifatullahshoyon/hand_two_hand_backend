"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
// import { sendImageToCloudinary } from '../../../helpers/fileUploadHelper';
const items_service_1 = require("./items.service");
// create product
const createProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const payload = JSON.parse(req.body.data);
    const payload = req.body;
    //! img upload functionality
    // if (req.file) {
    //   const imgName = req.file?.filename ? req.file?.filename : 'product img';
    //   const imageName = imgName;
    //   const path = req.file.path;
    //   const { secure_url } = await sendImageToCloudinary(imageName, path);
    //   payload.image = secure_url;
    // }
    // console.log('product controller payload: ', payload);
    const result = yield items_service_1.productService.createProductIntoDB(payload);
    (0, sendResponse_1.default)(res, {
        message: 'Product created successfully',
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        data: result,
    });
}));
// Get All Products
const getAllProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield items_service_1.productService.getAllProductsFromDb(req.query);
    (0, sendResponse_1.default)(res, {
        message: 'All Products retrieved successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
// Get Single Products
const getSingleProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    const result = yield items_service_1.productService.getSingleProductFromDb(productId);
    (0, sendResponse_1.default)(res, {
        message: 'Single Product retrieved successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
// update product
const updateProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    const data = req.body;
    const result = yield items_service_1.productService.updateProductIntoDB(productId, data);
    (0, sendResponse_1.default)(res, {
        message: 'Product updated successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
// delete product
const deleteProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    yield items_service_1.productService.deleteProductFromDb(productId);
    (0, sendResponse_1.default)(res, {
        message: 'Product deleted successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: {},
    });
}));
exports.productController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
