import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
  token?: string;
};

type UserResponse = {
  data: User | null;
};

const getUserFromLocalStorage = (): UserResponse | null => {
  const user = localStorage.getItem('user');
  if (!user) return null;
  return JSON.parse(user);
};

const defaultUserState: UserResponse = { data: null };

const initialState: UserResponse =
  getUserFromLocalStorage() || defaultUserState;

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<UserResponse>) => {
      const response = action.payload;
      state.data = response.data;
      localStorage.setItem('user', JSON.stringify(response));
    },
    logoutUser: (state) => {
      state.data = null;
      localStorage.removeItem('user');
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
