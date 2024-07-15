import { createSlice } from '@reduxjs/toolkit';

const initialState = { data: null };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getAllTasks(state) {
      console.log(state);
      console.log(getAllTasks);
    },
  },
});

export const { getAllTasks } = userSlice.actions;
export default userSlice.reducer;
