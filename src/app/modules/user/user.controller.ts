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

// Get Single user
const getSingleUser = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await userService.getSingleUserFromDb(id);

  sendResponse(res, {
    message: 'Single User retrieved successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

// Get update user
const getUpdateUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const result = await userService.userUpdatedFromDb(id, body);

  sendResponse(res, {
    message: 'User update  successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

// delete user
const deleteUser = catchAsync(async (req, res) => {
  const id = req.params.id;

  await userService.deleteUserFromDb(id);

  sendResponse(res, {
    message: 'User update  successfully',
    statusCode: StatusCodes.OK,
    data: {},
  });
});

// Get All user
const getAllUser = catchAsync(async (req, res) => {
  const result = await userService.getAllUserFromDb();

  sendResponse(res, {
    message: 'All User retrieved successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const userController = {
  createUser,
  getSingleUser,
  getUpdateUser,
  deleteUser,
  getAllUser,
};
