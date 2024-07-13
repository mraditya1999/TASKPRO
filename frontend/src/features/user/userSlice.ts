import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserFromLocalStorage, IUserResponse } from '../../utils';

const initialState: IUserResponse = getUserFromLocalStorage() || { data: null };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (
      state,
      action: PayloadAction<IUserResponse & { rememberMe: boolean }>
    ) => {
      const { data, rememberMe } = action.payload;
      state.data = data;

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('user', JSON.stringify(data));
    },
    logoutUser: (state) => {
      state.data = null;
      localStorage.removeItem('user');
      localStorage.removeItem('rememberMe');
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
