/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { handleGenericError } from '../helpers/handleGenericError';
import { handleValidationError } from '../helpers/handleValidationError';
import { handleZodError } from '../helpers/handleZodError';
import { handleCastError } from '../helpers/handleCastError';
import { handleDuplicateError } from '../helpers/handleDuplicateError';

export type TErrorResponse = {
  success: boolean;
  message: string;
  error: any;
  code?: number;
  name?: string;
  stack: string;
};
export const globalErrorHandler = (
  err: TErrorResponse,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  _next: NextFunction,
) => {
  if (err.name && err.name === 'ZodError') {
    // zod error
    handleZodError(err, res);
  } else if (err instanceof mongoose.Error.CastError) {
    // errors of mongoose
    handleCastError(err, res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    // errors of mongoose
    handleValidationError(err, res);
  } else if (err.code && err.code === 11000) {
    handleDuplicateError(err, res);
  } else if (err instanceof Error) {
    // javascript error
    handleGenericError(err, res);
  }
};
