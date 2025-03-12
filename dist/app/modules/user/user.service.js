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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_model_1 = require("./user.model");
// create user
const createUserIntoDb = (payload, role) => __awaiter(void 0, void 0, void 0, function* () {
    payload.role = role;
    const result = yield user_model_1.UserModel.create(payload);
    return result;
});
// Get Single User
const getSingleUserFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findById(id, { new: true });
    return result;
});
// Get Update single User
const userUpdatedFromDb = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findByIdAndUpdate(id, body, { new: true });
    return result;
});
// Delete single User
const deleteUserFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findByIdAndDelete(id, { new: true });
    return result;
});
// Get All User
const getAllUserFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.find();
    return result;
});
exports.userService = {
    createUserIntoDb,
    getSingleUserFromDb,
    userUpdatedFromDb,
    deleteUserFromDb,
    getAllUserFromDb,
};
