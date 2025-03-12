"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { NextFunction, Request, Response, Router } from 'express';
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const items_validation_1 = require("./items.validation");
// import { upload } from '../../../helpers/fileUploadHelper';
const items_controller_1 = require("./items.controller");
const productRouter = (0, express_1.Router)();
// create product routes:-
// productRouter.post(
//   '/create-product',
//   upload.single('file'),
//   (req: Request, res: Response, next: NextFunction) => {
//     req.body = JSON.parse(req.body.data);
//     next();
//   },
//   validateRequest(productValidation.productValidationSchema),
//   productController.createProduct,
// );
productRouter.post('/create-product', (0, validateRequest_1.default)(items_validation_1.productValidation.productValidationSchema), items_controller_1.productController.createProduct);
// get single product routes
productRouter.get('/:productId', items_controller_1.productController.getSingleProduct);
// update product routes
productRouter.put('/:productId', items_controller_1.productController.updateProduct);
// delete product routes
productRouter.delete('/:productId', items_controller_1.productController.deleteProduct);
// get all products routes
productRouter.get('/', items_controller_1.productController.getAllProducts);
exports.default = productRouter;
