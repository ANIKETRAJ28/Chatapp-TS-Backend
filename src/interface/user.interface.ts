export interface IUser {
  id: string;
  username: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export interface IUserRequest {
  username: string;
  name: string;
  email: string;
  password: string;
}

export interface IUserResponse {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar: string;
}
