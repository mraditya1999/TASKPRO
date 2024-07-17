import { IUser, IUserState } from './types';

export const getUserFromStorage = (): IUser | null => {
  const user = localStorage.getItem('user') || sessionStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const initialState: IUserState = {
  user: null,
};
