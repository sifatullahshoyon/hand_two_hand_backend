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
exports.productService = void 0;
const queryBuilder_1 = __importDefault(require("../../../builder/queryBuilder"));
const items_model_1 = require("./items.model");
// create product
const createProductIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield items_model_1.ProductModel.create(payload);
    return result;
});
// get all products:-
const getAllProductsFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchableFields = ['name', 'brand', 'category'];
    const products = new queryBuilder_1.default(items_model_1.ProductModel.find(), query)
        .search(searchableFields)
        .filter()
        .sort()
        .paginate()
        .select();
    const result = yield products.modelQuery;
    return result;
});
// get single product
const getSingleProductFromDb = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield items_model_1.ProductModel.findById(productId);
    return result;
});
// product update
const updateProductIntoDB = (productId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield items_model_1.ProductModel.findByIdAndUpdate(productId, data, {
        new: true,
    });
    return result;
});
// delete product
const deleteProductFromDb = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield items_model_1.ProductModel.findByIdAndDelete(productId, { new: true });
    return result;
});
exports.productService = {
    createProductIntoDB,
    getAllProductsFromDb,
    getSingleProductFromDb,
    updateProductIntoDB,
    deleteProductFromDb,
};
