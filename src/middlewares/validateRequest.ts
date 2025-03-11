import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const parseBody = await schema.parseAsync(req.body);

    req.body = parseBody;

    next();
  });
};

export default validateRequest;
