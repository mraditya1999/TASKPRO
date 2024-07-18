import { IUser } from './types';

export const getUserFromStorage = (): IUser | null => {
  const userFromLocalStorage = localStorage.getItem('user');
  if (userFromLocalStorage) {
    return JSON.parse(userFromLocalStorage) as IUser;
  }

  const userFromSessionStorage = sessionStorage.getItem('user');
  if (userFromSessionStorage) {
    return JSON.parse(userFromSessionStorage) as IUser;
  }

  return null;
};
