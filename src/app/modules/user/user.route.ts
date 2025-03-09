import { Router } from 'express';
import { userController } from './user.controller';

const userRouter = Router();

// create user
userRouter.post('/create-user', userController.createUser);

// get single user
userRouter.get('/:id', userController.getSingleUser);

// update single user
userRouter.put('/:id', userController.getUpdateUser);

// delete single user
userRouter.delete('/:id', userController.deleteUser);

//get all users
// authorization example
userRouter.get(
  '/',

  userController.getAllUser,
);

export default userRouter;
