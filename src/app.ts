import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import userRouter from './app/modules/user/user.route';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import authRouter from './app/modules/auth/auth.route';

const app: Application = express();

// middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// ========================== Application Routes Start ===================

// Auth
app.use('/api/auth', authRouter);

// User
app.use('/api/users', userRouter);

// Products
// app.use("/api/products", productRouter);

// Order
// app.use("/api/orders", orderRouter);

// ========================== Application Routes End ===================
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
