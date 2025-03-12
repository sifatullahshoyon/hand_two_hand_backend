"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../../middlewares/auth"));
const user_constants_1 = require("./user.constants");
const userRouter = (0, express_1.Router)();
// create user
userRouter.post('/create-user', (0, validateRequest_1.default)(user_validation_1.userValidation.userValidationSchema), user_controller_1.userController.createUser);
// get single user
userRouter.get('/:id', user_controller_1.userController.getSingleUser);
// update single user
userRouter.put('/:id', user_controller_1.userController.getUpdateUser);
// delete single user
userRouter.delete('/:id', user_controller_1.userController.deleteUser);
//get all users
// authorization example
userRouter.get('/', (0, auth_1.default)(user_constants_1.USER_ROLE.admin, user_constants_1.USER_ROLE.user), user_controller_1.userController.getAllUser);
exports.default = userRouter;
