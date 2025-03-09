"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const userRouter = (0, express_1.Router)();
// create user
userRouter.post('/create-user', user_controller_1.userController.createUser);
exports.default = userRouter;
