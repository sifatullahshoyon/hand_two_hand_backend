"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sales_controller_1 = require("./sales.controller");
const router = express_1.default.Router();
// GET /api/sales/:sellerID - Get sales history for a seller
router.get('/:sellerID', sales_controller_1.salesController.getSalesHistory);
// PATCH /api/sales/:transactionID - Update sale status
router.patch('/:transactionID', sales_controller_1.salesController.updateTransactionStatus);
exports.default = router;
