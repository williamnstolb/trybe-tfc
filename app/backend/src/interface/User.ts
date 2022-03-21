export interface LoginUser {
  email: string;
  password: string;
}

export interface BaseUser {
  id: number;
  username: string;
  role: string;
}

export interface UserFounded extends BaseUser {
  email: string;
}

export interface IUser extends BaseUser, LoginUser {}
