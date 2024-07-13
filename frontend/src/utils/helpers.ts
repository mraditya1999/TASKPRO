import { IUserResponse } from './types';

export const getUserFromLocalStorage = (): IUserResponse | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
