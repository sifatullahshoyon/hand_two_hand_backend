import config from '../../config';
import { IUser } from '../user/user.interface';
import { UserModel } from '../user/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ILoginUser } from './auth.interface';

// register
const register = async (payload: IUser): Promise<IUser> => {
  const result = await UserModel.create(payload);
  return result;
};

// login
const login = async (payload: ILoginUser) => {
  // checking if the user is exist
  const user = await UserModel.findOne({ email: payload?.email }).select(
    '+password',
  );

  if (!user) {
    throw new Error('User not found!');
  }

  // checking if the user is inactive
  const userStatus = user?.userStatus;

  if (userStatus === 'inactive') {
    throw new Error('User is not active!!');
  }

  //checking if the password is correct
  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatch) {
    throw new Error('Password do not match!!');
  }

  //create token and sent to the  client
  const jwtPayload = {
    name: user?.name,
    email: user?.email,
    role: user?.role,
    phoneNumber: user?.phoneNumber,
    _id: user?._id,
  };

  const token = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: '7d',
  });

  const verifiedUser = {
    name: user?.name,
    email: user?.email,
    role: user?.role,
  };

  return { token, verifiedUser };
};

export const authService = {
  register,
  login,
};
