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
exports.listingService = void 0;
const listings_model_1 = __importDefault(require("./listings.model"));
const createListingIntoDB = (listingData) => __awaiter(void 0, void 0, void 0, function* () {
    const newListing = new listings_model_1.default(listingData);
    yield newListing.save();
    return newListing;
});
const getAllListings = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield listings_model_1.default.find();
});
const getListingById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield listings_model_1.default.findById(id);
});
const updateListing = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield listings_model_1.default.findByIdAndUpdate(id, data, { new: true });
});
const deleteListing = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield listings_model_1.default.findByIdAndDelete(id);
});
exports.listingService = {
    createListingIntoDB,
    getAllListings,
    getListingById,
    updateListing,
    deleteListing,
};
