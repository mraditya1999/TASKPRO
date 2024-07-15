export interface IUser {
  id: string;
  name: string;
  email: string;
  role?: string;
  token?: string;
}

export interface IUserResponse {
  data: IUser | null;
  status?: string;
  rememberMe?: boolean;
}
