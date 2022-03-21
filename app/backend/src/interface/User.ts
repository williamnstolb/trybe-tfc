export interface LoginUser {
  email: string;
  password: string;
}

export interface IUser extends LoginUser {
  id: number;
  username: string;
  role: string;
}
