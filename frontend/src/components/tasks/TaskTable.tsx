import { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableContainer,
  Button,
  Snackbar,
  Alert,
  TableCell,
  TableRow,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import TaskTableHeader from './TaskTableHeader';
import TaskTableRow from './TaskTableRow';
import TaskDialog from './TaskDialog';
import { IRow } from '../../utils/types';
import { customFetch } from '../../utils';
import { useAppSelector } from '../../hooks';
import { fetchTasks } from '../../utils/taskUtils';

const TaskTable: React.FC = () => {
  const [rows, setRows] = useState<IRow[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [sortField, setSortField] = useState<keyof IRow>('task');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteTaskId, setDeleteTaskId] = useState<string>('');

  const user = useAppSelector((state) => state.user.user);
  const token = user?.token;
  const userId = user?.id;
  const userRole = user?.role;

  useEffect(() => {
    fetchTasks(token, setRows, userId);
  }, [token, userId]);

  const handleEditClick = (index: number) => {
    setEditIndex(index);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteTaskId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await customFetch(`/task-details/task/${deleteTaskId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data) {
        setSnackMessage('Task deleted successfully!');
        setSnackOpen(true);
        fetchTasks(token, setRows, userId);
      } else {
        console.error('Failed to delete task:', response);
      }
    } catch (error) {
      console.log(error);
    }

    setIsDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  const handleSort = (field: keyof IRow) => {
    const isAsc = sortField === field && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortField(field);
  };

  const priorityOrder = { Low: 1, Medium: 2, High: 3 };
  const statusOrder = { 'Not Yet Started': 1, 'In Progress': 2, Completed: 3 };

  const sortedRows = [...rows].sort((a, b) => {
    if (sortField === 'dueDate') {
      const dateA = a.dueDate ? new Date(a.dueDate).getTime() : 0;
      const dateB = b.dueDate ? new Date(b.dueDate).getTime() : 0;
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else if (sortField === 'priority') {
      return sortOrder === 'asc'
        ? priorityOrder[a.priority] - priorityOrder[b.priority]
        : priorityOrder[b.priority] - priorityOrder[a.priority];
    } else if (sortField === 'status') {
      return sortOrder === 'asc'
        ? statusOrder[a.status] - statusOrder[b.status]
        : statusOrder[b.status] - statusOrder[a.status];
    } else if (sortField !== 'task' && sortField !== 'remarks') {
      const fieldA = a[sortField];
      const fieldB = b[sortField];
      if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
      if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    }
    return 0;
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TaskTableHeader
          sortField={sortField}
          sortOrder={sortOrder}
          handleSort={handleSort}
        />
        <TableBody>
          {sortedRows.length > 0 ? (
            sortedRows.map((row, index) => (
              <TaskTableRow
                key={row.id}
                row={row}
                handleEditClick={() => handleEditClick(index)}
                handleDeleteClick={() => handleDeleteClick(row.id)}
              />
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

      <Dialog open={isDeleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this task?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteCancel}
            color='primary'
            variant='outlined'
            startIcon={<Delete />}
          >
            No, Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color='error'
            variant='contained'
            autoFocus
          >
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>

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
