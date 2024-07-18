import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import { IRow } from '../../utils/types';
import { customFetch } from '../../utils';
import { useAppSelector } from '../../hooks';
import TaskDialog from './TaskDialog';
import { fetchTasks } from '../../utils/taskUtils';

const TaskTable: React.FC = () => {
  const [rows, setRows] = useState<IRow[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');

  const user = useAppSelector((state) => state.user.user);
  const token = user?.token;
  const userId = user?.id;
  const userRole = user?.role;

  useEffect(() => {
    fetchTasks(token, setRows);
  }, [token]);

  const handleEditClick = (index: number) => {
    setEditIndex(index);
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
        fetchTasks(token, setRows);
      } else {
        console.error('Failed to delete task:', response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  return (
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

      <TaskDialog
        open={editIndex !== null}
        onClose={() => setEditIndex(null)}
        rows={rows}
        setRows={setRows}
        editIndex={editIndex}
        setEditIndex={setEditIndex}
        token={token}
        userId={userId}
        userRole={userRole}
        setSnackMessage={setSnackMessage}
        setSnackOpen={setSnackOpen}
        user={user}
      />

      <TaskDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        rows={rows}
        setRows={setRows}
        editIndex={null}
        setEditIndex={setEditIndex}
        token={token}
        userId={userId}
        userRole={userRole}
        setSnackMessage={setSnackMessage}
        setSnackOpen={setSnackOpen}
        user={user}
      />

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
    </TableContainer>
  );
};

export default TaskTable;
