import { Router } from 'express';

import { USER_ROLE } from '../user/user.constants';
import auth from '../../../middlewares/auth';
import { orderController } from './order.controller';

const orderRouter = Router();

orderRouter.get('/verify', auth(USER_ROLE.user), orderController.verifyPayment);

orderRouter.post(
  '/create-order',
  auth(USER_ROLE.user),
  orderController.createOrder,
);

orderRouter.get('/', auth(USER_ROLE.user), orderController.getOrders);

export default orderRouter;
