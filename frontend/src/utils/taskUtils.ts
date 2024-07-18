import { IRow } from './types';
import { customFetch } from './customFetch';

export const createData = (task: string): IRow => {
  return {
    id: '',
    task,
    status: 'Pending',
    timeSpend: 0,
    dueDate: '',
    priority: 'Low',
    remarks: '',
    accepted: false,
    isEditing: false,
  };
};

export const fetchTasks = async (
  token: string | undefined,
  setRows: React.Dispatch<React.SetStateAction<IRow[]>>
) => {
  if (!token) return;

  try {
    const response = await customFetch('/task-details', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data) {
      const data = response.data.data;
      setRows(data);
    } else {
      console.error('Failed to fetch tasks:', response);
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};
