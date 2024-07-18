import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { IUser, IUserState } from '../../utils/types';
import { getUserFromStorage } from '../../utils/helpers';

const initialState: IUserState = {
  user: getUserFromStorage(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (
      state,
      action: PayloadAction<IUser & { rememberMe: boolean }>
    ) => {
      state.user = action.payload;
      const storage = action.payload.rememberMe ? localStorage : sessionStorage;
      storage.setItem('user', JSON.stringify(action.payload));
      if (action.payload.rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }
      toast.success('Logged In Successfully');
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      localStorage.removeItem('rememberMe');
      toast.success('Logged Out Successfully');
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
