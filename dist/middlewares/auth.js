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
const config_1 = __importDefault(require("../app/config"));
const user_model_1 = require("../app/modules/user/user.model");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
        const user = yield user_model_1.UserModel.findOne({ email: decoded.email }).select('_id');
        if (!user) {
            throw new Error('User not found');
        }
        return Object.assign(Object.assign({}, decoded), { _id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        throw new Error('Invalid or expired token');
    }
});
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token) {
            throw new Error('You are not authorized!');
        }
        // Verify the token and get user details
        const decoded = yield verifyToken(token);
        // Fetch the user from DB using the decoded email
        const user = yield user_model_1.UserModel.findOne({ email: decoded.email });
        if (!user) {
            throw new Error('This user is not found!');
        }
        // Check if the user's status is inactive
        if (user.userStatus === 'inactive') {
            throw new Error('This user is blocked!');
        }
        // Check if the user has the required role
        if (requiredRoles && !requiredRoles.includes(decoded.role)) {
            throw new Error('You are not authorized');
        }
        req.user = decoded; // Attach decoded user info to the request object
        next();
    }));
};
exports.default = auth;
