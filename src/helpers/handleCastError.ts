import { Response } from 'express';
import { TErrorResponse } from '../middlewares/globalErrorHandler';
import { StatusCodes } from 'http-status-codes';

export const handleCastError = (err: TErrorResponse, res: Response) => {
  res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    message: err.message,
    err,
    stack: err.stack,
  });
};
