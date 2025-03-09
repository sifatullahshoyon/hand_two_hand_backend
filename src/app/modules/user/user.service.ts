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

export const userService = {
  createUserIntoDb,
};
