import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../../utils/sendResponse';
import catchAsync from '../../../utils/catchAsync';
import { userService } from './user.service';

// create user
const createUser = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await userService.createUserIntoDb(payload, 'user'); // user রোল

  sendResponse(res, {
    message: 'User Created successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

export const userController = {
  createUser,
};
