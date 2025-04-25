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
const http_status_codes_1 = require("http-status-codes");
const listings_model_1 = __importDefault(require("../app/modules/listings/listings.model"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const verifyListingOwner = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const listing = yield listings_model_1.default.findById(req.params.id);
    if (!listing) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: 'Listing not found' });
        return;
    }
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'admin' &&
        ((_b = listing.userID) === null || _b === void 0 ? void 0 : _b.toString()) !== ((_c = req.user) === null || _c === void 0 ? void 0 : _c.id)) {
        res
            .status(http_status_codes_1.StatusCodes.FORBIDDEN)
            .json({ message: 'You do not have permission to modify this listing' });
        return;
    }
    next();
}));
exports.default = verifyListingOwner;
