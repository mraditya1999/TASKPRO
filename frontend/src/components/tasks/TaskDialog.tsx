import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { IRow, IUser } from '../../utils/types';
import { customFetch } from '../../utils/customFetch';
import { createData, fetchTasks } from '../../utils/taskUtils';

interface TaskDialogProps {
  open: boolean;
  onClose: () => void;
  rows: IRow[];
  setRows: React.Dispatch<React.SetStateAction<IRow[]>>;
  editIndex: number | null;
  setEditIndex: React.Dispatch<React.SetStateAction<number | null>>;
  token: string | undefined;
  userId: string | undefined;
  userRole: string | undefined;
  setSnackMessage: React.Dispatch<React.SetStateAction<string>>;
  setSnackOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser | null;
}

const TaskDialog: React.FC<TaskDialogProps> = ({
  open,
  onClose,
  rows,
  setRows,
  editIndex,
  setEditIndex,
  token,
  userId,
  setSnackMessage,
  setSnackOpen,
  user,
}) => {
  const [taskData, setTaskData] = useState<IRow>(
    editIndex !== null && rows[editIndex] ? rows[editIndex] : createData('')
  );

  useEffect(() => {
    if (editIndex !== null && rows[editIndex]) {
      const { task, status, timeSpend, dueDate, priority, remarks, accepted } =
        rows[editIndex];
      setTaskData({
        task,
        status,
        timeSpend,
        dueDate,
        priority,
        remarks,
        accepted,
        id: rows[editIndex].id,
        isEditing: false,
      });
    } else {
      // Reset form data if creating a new task
      setTaskData({
        task: '',
        status: 'Not Yet Started',
        timeSpend: 0,
        dueDate: null,
        priority: 'Medium',
        remarks: '',
        accepted: false,
        id: user?.id || '',
        isEditing: false,
      });
    }
  }, [editIndex, rows, user]);

  const handleInputChange = (
    field: keyof IRow,
    value: string | number | Date | boolean | null
  ) => {
    if (field === 'dueDate' && value instanceof Date) {
      value = value.toISOString(); // Convert to ISO string
    }

    setTaskData((prevData) => ({
      ...prevData,
      [field]: value as never,
    }));
  };

  const handleSaveClick = async () => {
    if (!taskData.task.trim()) {
      setSnackMessage('Task name is required.');
      setSnackOpen(true);
      return;
    }

    if (taskData.timeSpend <= 0) {
      setSnackMessage('Time spent must be greater than zero.');
      setSnackOpen(true);
      return;
    }

    if (!taskData.dueDate) {
      setSnackMessage('Due date is required.');
      setSnackOpen(true);
      return;
    }

    if (editIndex !== null) {
      const { id, isEditing, ...updatedRow } = taskData;
      console.log(isEditing);

      try {
        const response = await customFetch(`/task-details/task/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          data: updatedRow,
        });

        if (response.status === 200) {
          setRows((prevRows) =>
            prevRows.map((row, i) =>
              i === editIndex ? { ...updatedRow, id, isEditing: false } : row
            )
          );
          setSnackMessage('Task updated successfully!');
          setSnackOpen(true);
          setEditIndex(null);
        } else {
          console.error('Failed to update task:', response);
        }
      } catch (error) {
        console.error('Error updating task:', error);
      }
    } else {
      try {
        const newTaskData = {
          ...taskData,
          userId,
        };

        const response = await customFetch(`/task-details/user/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          data: newTaskData,
        });

        if (response.status === 201) {
          setSnackMessage('Task created successfully!');
          setSnackOpen(true);
          fetchTasks(token, setRows, userId); // Re-fetch tasks to get updated data
          onClose();
        } else {
          console.error('Failed to create task:', response);
        }
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {editIndex !== null ? 'Edit Task' : 'Create Task'}
      </DialogTitle>
      <DialogContent>
        <TextField
          margin='dense'
          label='Task'
          fullWidth
          value={taskData.task}
          onChange={(e) => handleInputChange('task', e.target.value)}
        />
        <Select
          margin='dense'
          fullWidth
          value={taskData.status}
          onChange={(e) => handleInputChange('status', e.target.value)}
        >
          <MenuItem value='Not Yet Started'>Not Yet Started</MenuItem>
          <MenuItem value='In Progress'>In Progress</MenuItem>
          <MenuItem value='Completed'>Completed</MenuItem>
        </Select>
        <TextField
          margin='dense'
          label='Time Spend (minutes)'
          fullWidth
          type='number'
          value={taskData.timeSpend}
          onChange={(e) =>
            handleInputChange('timeSpend', Number(e.target.value))
          }
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label='Due Date'
            value={taskData.dueDate ? new Date(taskData.dueDate) : null}
            onChange={(date) => handleInputChange('dueDate', date)}
            slotProps={{
              textField: {
                margin: 'dense',
                fullWidth: true,
              },
            }}
          />
        </LocalizationProvider>
        <Select
          margin='dense'
          fullWidth
          value={taskData.priority}
          onChange={(e) => handleInputChange('priority', e.target.value)}
        >
          <MenuItem value='Low'>Low</MenuItem>
          <MenuItem value='Medium'>Medium</MenuItem>
          <MenuItem value='High'>High</MenuItem>
        </Select>
        <TextField
          margin='dense'
          label='Remarks'
          fullWidth
          value={taskData.remarks}
          onChange={(e) => handleInputChange('remarks', e.target.value)}
        />
        <Select
          margin='dense'
          fullWidth
          value={taskData.accepted ? 'Yes' : 'No'}
          onChange={() => {
            // if (userRole === 'admin') {
            //   handleInputChange('accepted', e.target.value === 'Yes');
            // }
          }}
          // disabled={userRole !== 'admin'} // Disable if not admin
          disabled
        >
          <MenuItem value='Yes'>Yes</MenuItem>
          <MenuItem value='No'>No</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleSaveClick} color='primary'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;
