import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Select,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Delete, Edit, Add } from '@mui/icons-material';
import { IRow } from '../utils/types';
import { customFetch } from '../utils';
import { useAppSelector } from '../hooks';

const createData = (
  task: string,
  status: 'Not Yet Started' | 'In Progress' | 'Completed' = 'Not Yet Started',
  timeSpend: number = 0,
  dueDate: Date | null = null,
  priority: 'High' | 'Medium' | 'Low' = 'Medium',
  remarks: string = '',
  accepted: boolean = false
): IRow => ({
  id: '',
  task,
  status,
  timeSpend,
  dueDate,
  priority,
  remarks,
  accepted,
  isEditing: false,
});

const TaskTable: React.FC = () => {
  const [rows, setRows] = useState<IRow[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editRow, setEditRow] = useState<IRow | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [newRow, setNewRow] = useState<IRow>(createData(''));
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');

  const user = useAppSelector((state) => state.user.user);
  const token = user.data.data.token;
  const userId = user.data.data.id;

  const fetchTasks = async () => {
    try {
      const response = await customFetch('/task-details', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRows(response.data.data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setRows([]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setEditRow({ ...rows[index] });
  };

  const handleSaveClick = async () => {
    if (editIndex !== null && editRow) {
      const { id, ...updatedRow } = editRow;

      try {
        const response = await customFetch(`/task-details/task/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          data: updatedRow, // Use the updatedRow without id
        });

        if (response.status === 200) {
          setRows((prevRows) =>
            prevRows.map(
              (row, i) =>
                i === editIndex ? { ...updatedRow, id, isEditing: false } : row // Include id here
            )
          );
          setEditIndex(null);
          setEditRow(null);
        } else {
          console.error('Failed to update task:', response);
        }
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  const handleDeleteClick = async (id: string) => {
    try {
      const response = await customFetch(`/task-details/task/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data) {
        setSnackMessage('Task deleted successfully!');
        setSnackOpen(true);
        fetchTasks(); // Re-fetch tasks to get updated data
      } else {
        console.error('Failed to delete task:', response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (
    field: keyof IRow,
    value: string | number | Date | null
  ) => {
    if (field === 'dueDate' && value instanceof Date) {
      value = value.toISOString(); // Convert to ISO string
    }

    setEditRow((prevRow) => {
      if (!prevRow) return null; // Handle null case

      return {
        ...prevRow,
        [field]: value as never,
      } as IRow; // Assert the return type as IRow
    });
  };

  const handleCreateInputChange = (
    field: keyof IRow,
    value: string | number | Date | null
  ) => {
    if (field === 'dueDate' && value instanceof Date) {
      value = value.toISOString(); // Convert to ISO string
    }
    setNewRow({ ...newRow, [field]: value as never });
  };

  const handleCreateClick = async () => {
    try {
      const taskData = {
        ...newRow,
        userId, // Include userId in the request body
        accepted: newRow.accepted === true,
      };

      // Remove isEditing from the taskData
      // delete taskData.isEditing;

      const response = await customFetch(`/task-details/user/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: taskData, // Use the constructed taskData
      });

      if (response.status === 201) {
        setSnackMessage('Task created successfully!');
        setSnackOpen(true);
        fetchTasks(); // Re-fetch tasks to get updated data
        setIsCreateDialogOpen(false);
        setNewRow(createData('')); // Reset newRow to its initial state
      } else {
        console.error('Failed to create task:', response);
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Time Spend (minutes)</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell>Accepted</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{row.task}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.timeSpend}</TableCell>
                  <TableCell>
                    {row.dueDate ? new Date(row.dueDate).toDateString() : 'N/A'}
                  </TableCell>
                  <TableCell>{row.priority}</TableCell>
                  <TableCell>{row.remarks}</TableCell>
                  <TableCell>{row.accepted ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(index)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteClick(row.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align='center'>
                  No tasks available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Button
          variant='contained'
          color='primary'
          startIcon={<Add />}
          onClick={() => setIsCreateDialogOpen(true)}
          sx={{ margin: 2 }}
        >
          Create Task
        </Button>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={editIndex !== null} onClose={() => setEditIndex(null)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            label='Task'
            fullWidth
            value={editRow?.task || ''}
            onChange={(e) => handleInputChange('task', e.target.value)}
          />
          <Select
            margin='dense'
            fullWidth
            value={editRow?.status || ''}
            onChange={(e) => handleInputChange('status', e.target.value)}
          >
            <MenuItem value='Not Yet Started'>Not Yet Started</MenuItem>
            <MenuItem value='In Progress'>In Progress</MenuItem>
            <MenuItem value='Completed'>Completed</MenuItem>
          </Select>
          <TextField
            margin='dense'
            label='Time Spend (minutes)'
            type='number'
            fullWidth
            value={editRow?.timeSpend || 0}
            onChange={(e) =>
              handleInputChange('timeSpend', Number(e.target.value))
            }
          />
          {/* <DatePicker
            value={editRow?.dueDate ? new Date(editRow.dueDate) : null} // Ensure it's a Date object
            onChange={(date) => handleInputChange('dueDate', date)}
            components={{
              TextField: (props) => (
                <TextField {...props} margin='dense' fullWidth />
              ),
            }}
          /> */}

          <DatePicker
            value={editRow?.dueDate ? new Date(editRow.dueDate) : null} // Ensure it's a Date object
            onChange={(date) => handleInputChange('dueDate', date)}
            slotProps={{
              textField: {
                margin: 'dense',
                fullWidth: true,
              },
            }}
          />

          <Select
            margin='dense'
            fullWidth
            value={editRow?.priority || ''}
            onChange={(e) => handleInputChange('priority', e.target.value)}
          >
            <MenuItem value='High'>High</MenuItem>
            <MenuItem value='Medium'>Medium</MenuItem>
            <MenuItem value='Low'>Low</MenuItem>
          </Select>
          <TextField
            margin='dense'
            label='Remarks'
            fullWidth
            value={editRow?.remarks || ''}
            onChange={(e) => handleInputChange('remarks', e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditIndex(null)}>Cancel</Button>
          <Button onClick={handleSaveClick} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* Create Dialog */}
      <Dialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      >
        <DialogTitle>Create Task</DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            label='Task'
            fullWidth
            value={newRow.task}
            onChange={(e) => handleCreateInputChange('task', e.target.value)}
          />
          <Select
            margin='dense'
            fullWidth
            value={newRow.status}
            onChange={(e) => handleCreateInputChange('status', e.target.value)}
          >
            <MenuItem value='Not Yet Started'>Not Yet Started</MenuItem>
            <MenuItem value='In Progress'>In Progress</MenuItem>
            <MenuItem value='Completed'>Completed</MenuItem>
          </Select>
          <TextField
            margin='dense'
            label='Time Spend (minutes)'
            type='number'
            fullWidth
            value={newRow.timeSpend || 0}
            onChange={(e) =>
              handleCreateInputChange('timeSpend', Number(e.target.value))
            }
          />
          <DatePicker
            value={newRow.dueDate ? new Date(newRow.dueDate) : null} // Ensure it's a Date object
            onChange={(date) => handleCreateInputChange('dueDate', date)}
            slotProps={{
              textField: {
                margin: 'dense',
                fullWidth: true,
              },
            }}
          />

          <Select
            margin='dense'
            fullWidth
            value={newRow.priority}
            onChange={(e) =>
              handleCreateInputChange('priority', e.target.value)
            }
          >
            <MenuItem value='High'>High</MenuItem>
            <MenuItem value='Medium'>Medium</MenuItem>
            <MenuItem value='Low'>Low</MenuItem>
          </Select>
          <TextField
            margin='dense'
            label='Remarks'
            fullWidth
            value={newRow.remarks}
            onChange={(e) => handleCreateInputChange('remarks', e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateClick} color='primary'>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleSnackClose}
      >
        <Alert
          onClose={handleSnackClose}
          severity='success'
          sx={{ width: '100%' }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </LocalizationProvider>
  );
};

export default TaskTable;
