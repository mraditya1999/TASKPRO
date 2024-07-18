import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRow } from '../../utils/types';
import { customFetch } from '../../utils';

interface TaskState {
  tasks: IRow[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<IRow[]>) {
      state.tasks = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
    addTask(state, action: PayloadAction<IRow>) {
      state.tasks.push(action.payload);
    },
    updateTask(state, action: PayloadAction<{ id: string; updatedTask: IRow }>) {
      const { id, updatedTask } = action.payload;
      const index = state.tasks.findIndex(task => task.id === id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
});

export const {
  setTasks,
  setLoading,
  setError,
  addTask,
  updateTask,
  deleteTask,
} = taskSlice.actions;

export default taskSlice.reducer;

export const fetchTasks =
  (token: string | undefined): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await customFetch('/task-details', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data.data;
      dispatch(setTasks(data));
    } catch (error) {
      if (error instanceof Error) dispatch(setError(error.message));
      else dispatch(setError('Something went wrong. Please try again later'));
    }
  };
