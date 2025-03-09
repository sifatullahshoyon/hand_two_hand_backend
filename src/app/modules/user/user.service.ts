import { IUser } from './user.interface';
import { UserModel } from './user.model';

// create user
const createUserIntoDb = async (
  payload: IUser,
  role: 'user' | 'admin',
): Promise<IUser> => {
  payload.role = role;

  const result = await UserModel.create(payload);

  return result;
};

// Get Single User
const getSingleUserFromDb = async (id: string) => {
  const result = await UserModel.findById(id, { new: true });

  return result;
};

// Get Update single User
const userUpdatedFromDb = async (id: string, body: IUser) => {
  const result = await UserModel.findByIdAndUpdate(id, body, { new: true });

  return result;
};

// Delete single User
const deleteUserFromDb = async (id: string) => {
  const result = await UserModel.findByIdAndDelete(id, { new: true });

  return result;
};

// Get All User
const getAllUserFromDb = async () => {
  const result = await UserModel.find();

  return result;
};

export const userService = {
  createUserIntoDb,
  getSingleUserFromDb,
  userUpdatedFromDb,
  deleteUserFromDb,
  getAllUserFromDb,
};
