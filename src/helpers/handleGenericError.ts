import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TErrorResponse } from '../middlewares/globalErrorHandler';

export const handleGenericError = (err: TErrorResponse, res: Response) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message,
    err,
    stack: err.stack,
  });
};
