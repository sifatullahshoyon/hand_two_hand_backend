import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../../utils/sendResponse';
import catchAsync from '../../../utils/catchAsync';
import { salesService } from './sales.service';

// Get sales history for a seller
const getSalesHistory = catchAsync(async (req: Request, res: Response) => {
  const result = await salesService.getSalesHistory(req.params.sellerID);

  sendResponse(res, {
    message: 'Sales history retrieved successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

// Update transaction status
const updateTransactionStatus = catchAsync(
  async (req: Request, res: Response) => {
    const result = await salesService.updateTransactionStatus(
      req.params.transactionID,
      req.body.status,
    );

    sendResponse(res, {
      message: 'Transaction status updated successfully',
      statusCode: StatusCodes.OK,
      data: result,
    });
  },
);

// Get single transaction details
const getTransactionById = catchAsync(async (req: Request, res: Response) => {
  const result = await salesService.getTransactionById(
    req.params.transactionID,
  );

  sendResponse(res, {
    message: 'Transaction details retrieved successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const salesController = {
  getSalesHistory,
  updateTransactionStatus,
  getTransactionById,
};
