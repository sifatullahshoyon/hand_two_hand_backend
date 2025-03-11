import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../../utils/sendResponse';
import catchAsync from '../../../utils/catchAsync';
import { transactionService } from './transactions.service';

// Create a new transaction
const createTransaction = catchAsync(async (req, res) => {
  const transaction = await transactionService.createTransactionIntoDb(
    req.body,
  );

  sendResponse(res, {
    message: 'Transaction created successfully',
    statusCode: StatusCodes.CREATED,
    data: transaction,
  });
});

// Get purchase history
const getPurchasesHistory = catchAsync(async (req, res) => {
  const purchases = await transactionService.getPurchasesFromDb(
    req.params.userId,
  );

  sendResponse(res, {
    message: 'Purchase history retrieved successfully',
    statusCode: StatusCodes.OK,
    data: purchases,
  });
});

// Get sales history
const getSalesHistory = catchAsync(async (req, res) => {
  const sales = await transactionService.getSalesFromDb(req.params.userId);

  sendResponse(res, {
    message: 'Sales history retrieved successfully',
    statusCode: StatusCodes.OK,
    data: sales,
  });
});

// Update transaction status
const updateTransactionStatus = catchAsync(async (req, res) => {
  const updatedTransaction =
    await transactionService.updateTransactionStatusInDb(
      req.params.id,
      req.body.status,
    );

  sendResponse(res, {
    message: 'Transaction status updated successfully',
    statusCode: StatusCodes.OK,
    data: updatedTransaction,
  });
});

export const transactionController = {
  createTransaction,
  getPurchasesHistory,
  getSalesHistory,
  updateTransactionStatus,
};
