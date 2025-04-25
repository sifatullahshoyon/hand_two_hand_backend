"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_constants_1 = require("../user/user.constants");
const auth_1 = __importDefault(require("../../../middlewares/auth"));
const order_controller_1 = require("./order.controller");
const orderRouter = (0, express_1.Router)();
orderRouter.get('/verify', (0, auth_1.default)(user_constants_1.USER_ROLE.user), order_controller_1.orderController.verifyPayment);
orderRouter.post('/create-order', (0, auth_1.default)(user_constants_1.USER_ROLE.user), order_controller_1.orderController.createOrder);
orderRouter.get('/', (0, auth_1.default)(user_constants_1.USER_ROLE.user), order_controller_1.orderController.getOrders);
exports.default = orderRouter;
