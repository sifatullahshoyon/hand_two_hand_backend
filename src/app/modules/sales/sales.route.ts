import express from 'express';
import { salesController } from './sales.controller';

const router = express.Router();

// GET /api/sales/:sellerID - Get sales history for a seller
router.get('/:sellerID', salesController.getSalesHistory);

// PATCH /api/sales/:transactionID - Update sale status
router.patch('/:transactionID', salesController.updateTransactionStatus);

export default router;
