import { USER_ROLE } from './user.constants';

export interface IUser {
  name: string;
  email: string;
  password: string;
  photo?: string | null;
  phoneNumber: string;
  role: 'user' | 'admin';
  userStatus: 'active' | 'inactive';
  createdAt?: Date;
  updatedAt?: Date;
}

export type TUserRole = keyof typeof USER_ROLE;
