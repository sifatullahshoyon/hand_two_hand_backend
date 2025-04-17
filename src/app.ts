import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import userRouter from './app/modules/user/user.route';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import authRouter from './app/modules/auth/auth.route';
import listingRouter from './app/modules/listings/listings.route';
import productRouter from './app/modules/items/items.route';
import transactionRouter from './app/modules/transactions/transactions.route';
import orderRouter from './app/modules/order/order.route';
import cookieParser from 'cookie-parser';

const app: Application = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  }),
);

// ========================== Application Routes Start ===================

// Auth
app.use('/api/auth', authRouter);

// User
app.use('/api/users', userRouter);

// Listings
app.use('/api/listings', listingRouter);

// Items or Products
app.use('/api/items', productRouter);

// Order
app.use('/api/order', orderRouter);

// transactions
app.use('/api/transactions', transactionRouter);

//* ========================== Application Routes End ===================

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Hand To Hand Server is Live⚡',
  });
});

// Global Error Handler
app.use(globalErrorHandler);

// not found route
app.use('*', (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Route is not found',
  });
});

export default app;
