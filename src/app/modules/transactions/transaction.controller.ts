import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../../utils/sendResponse';
import catchAsync from '../../../utils/catchAsync';
import { transactionService } from './transactions.service';

// Create a new transaction
const createTransaction = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await transactionService.createTransactionIntoDb(payload);

  sendResponse(res, {
    message: 'Transaction created successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

// Get purchase history
const getPurchasesHistory = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const result = await transactionService.getPurchasesFromDb(userId);

  sendResponse(res, {
    message: 'Purchase history retrieved successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

// Get sales history
const getSalesHistory = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const result = await transactionService.getSalesFromDb(userId);

  sendResponse(res, {
    message: 'Sales history retrieved successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

// Update transaction status
const updateTransactionStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await transactionService.updateTransactionStatusInDb(
    id,
    status,
  );

  sendResponse(res, {
    message: 'Transaction status updated successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const transactionController = {
  createTransaction,
  getPurchasesHistory,
  getSalesHistory,
  updateTransactionStatus,
};
