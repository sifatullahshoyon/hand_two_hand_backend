import { USER_ROLE } from './user.constants';

export interface IUser {
  name: string;
  email: string;
  password: string;
  photo?: string | null;
  phoneNumber?: string;
  role: 'user' | 'admin';
  userStatus: 'active' | 'inactive';
  address?: string;
  city?: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id: string;
}

export type TUserRole = keyof typeof USER_ROLE;
