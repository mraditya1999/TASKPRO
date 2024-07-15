import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './features';
import taskSlice from './features/task/taskSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    task: taskSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type ReduxStore = {
  getState: () => RootState;
  dispatch: AppDispatch;
};
