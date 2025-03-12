"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const listings_validation_1 = require("./listings.validation");
const listings_controller_1 = require("./listings.controller");
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../../middlewares/auth"));
const listingRouter = (0, express_1.Router)();
listingRouter.post('/', (0, auth_1.default)('user', 'admin'), (0, validateRequest_1.default)(listings_validation_1.listingValidation.listingValidationSchema), listings_controller_1.listingController.createListing);
listingRouter.get('/:id', listings_controller_1.listingController.getListingById);
listingRouter.put('/:id', (0, auth_1.default)('user', 'admin'), (0, validateRequest_1.default)(listings_validation_1.listingValidation.listingValidationSchema), listings_controller_1.listingController.updateListing);
listingRouter.delete('/:id', (0, auth_1.default)('admin', 'user'), listings_controller_1.listingController.deleteListing);
listingRouter.get('/', listings_controller_1.listingController.getListings);
exports.default = listingRouter;
