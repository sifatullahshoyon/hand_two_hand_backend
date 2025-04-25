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
exports.listingController = void 0;
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const listings_service_1 = require("./listings.service");
const mongoose_1 = __importDefault(require("mongoose"));
// create listings
const createListing = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, price, condition, images, status, color, availability, } = req.body;
    // Authentication middleware থেকে userId পাওয়া যাচ্ছে
    const userID = new mongoose_1.default.Types.ObjectId(req.body.userID);
    // ✅ ObjectId-তে রূপান্তর
    const listingData = {
        title,
        description,
        price,
        condition,
        images,
        userID,
        status,
        color,
        availability,
    };
    const result = yield listings_service_1.listingService.createListingIntoDB(listingData);
    (0, sendResponse_1.default)(res, {
        message: 'Listing created successfully',
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        data: result,
    });
}));
// get all listings
const getListings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield listings_service_1.listingService.getAllListings(req.query);
    (0, sendResponse_1.default)(res, {
        message: 'All Listings retrieved successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
// get single listing
const getListingById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield listings_service_1.listingService.getListingById(req.params.id);
    (0, sendResponse_1.default)(res, {
        message: 'Single Listing retrieved successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
// update listing
const updateListing = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield listings_service_1.listingService.updateListing(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        message: 'Listing updated successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
// delete listing
const deleteListing = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield listings_service_1.listingService.deleteListing(req.params.id);
    (0, sendResponse_1.default)(res, {
        message: 'Listing deleted successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: {},
    });
}));
exports.listingController = {
    createListing,
    getListings,
    getListingById,
    updateListing,
    deleteListing,
};
