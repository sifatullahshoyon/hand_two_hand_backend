export interface ILoginUser {
  email: string;
  password: string;
}

export interface IResetPassword {
  id: string;
  token: string;
  password: string;
}
