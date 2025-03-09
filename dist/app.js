"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_status_codes_1 = require("http-status-codes");
const user_route_1 = __importDefault(require("./app/modules/user/user.route"));
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: 'http://localhost:5173', credentials: true }));
// ========================== Application Routes Start ===================
// Auth
// app.use("/api/auth", authRouter);
// User
app.use('/api/users', user_route_1.default);
// Products
// app.use("/api/products", productRouter);
// Order
// app.use("/api/orders", orderRouter);
// ========================== Application Routes End ===================
app.get('/', (req, res) => {
    res.send({
        status: true,
        message: 'Hand To Hand Server is Live⚡',
    });
});
// Global Error Handler
// app.use(globalErrorHandler);
// not found route
app.use('*', (req, res) => {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Route is not found',
    });
});
exports.default = app;
