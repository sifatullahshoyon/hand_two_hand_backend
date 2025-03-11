import { Router } from 'express';
import { userController } from './user.controller';
import validateRequest from '../../../middlewares/validateRequest';
import { userValidation } from './user.validation';
import auth from '../../../middlewares/auth';
import { USER_ROLE } from './user.constants';

const userRouter = Router();

// create user
userRouter.post(
  '/create-user',
  validateRequest(userValidation.userValidationSchema),
  userController.createUser,
);

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
  auth(USER_ROLE.admin, USER_ROLE.user),
  userController.getAllUser,
);

export default userRouter;
