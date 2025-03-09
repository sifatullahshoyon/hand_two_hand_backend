import { Response } from 'express';
import { TErrorResponse } from '../middlewares/globalErrorHandler';
import { StatusCodes } from 'http-status-codes';

export const handleDuplicateError = (err: TErrorResponse, res: Response) => {
  res.status(StatusCodes.CONFLICT).json({
    success: false,
    message: err.message,
    err,
    stack: err.stack,
  });
};
