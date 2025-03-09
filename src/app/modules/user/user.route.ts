import { Router } from 'express';
import { userController } from './user.controller';

const userRouter = Router();

// create user
userRouter.post('/create-user', userController.createUser);

export default userRouter;
