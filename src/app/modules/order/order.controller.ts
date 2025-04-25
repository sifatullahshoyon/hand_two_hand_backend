import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { orderService } from './order.service';
import { IUser } from '../user/user.interface';

const createOrder = catchAsync(async (req, res) => {
  const user: IUser = req.user;

  const order = await orderService.createOrder(user, req.body, req.ip!);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Order placed successfully',
    data: order,
  });
});

const getOrders = catchAsync(async (req, res) => {
  const order = await orderService.getOrders();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Order retrieved successfully',
    data: order,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const order = await orderService.verifyPayment(req.query.order_id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Order verified successfully',
    data: order,
  });
});
export const orderController = { createOrder, verifyPayment, getOrders };
