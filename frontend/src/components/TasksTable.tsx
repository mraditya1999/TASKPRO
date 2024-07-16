import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { customFetch, getUserFromLocalStorage } from '../utils';

interface Column {
  id:
    | 'task'
    | 'status'
    | 'timeSpent'
    | 'dueDate'
    | 'priority'
    | 'remarks'
    | 'accepted';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'task', label: 'Task', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 100 },
  {
    id: 'timeSpent',
    label: 'Time Spent',
    minWidth: 170,
    align: 'right',
    format: (value: number) => `${value} hours`,
  },
  {
    id: 'dueDate',
    label: 'Due Date',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'priority',
    label: 'Priority',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'remarks',
    label: 'Remarks',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'accepted',
    label: 'Accepted',
    minWidth: 170,
    align: 'right',
  },
];

interface Data {
  task: string;
  status: 'not started' | 'in progress' | 'completed';
  timeSpent: number;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
  remarks: string;
  accepted: boolean;
}

function createData(
  task: string,
  status: 'not started' | 'in progress' | 'completed',
  timeSpent: number,
  dueDate: string,
  priority: 'high' | 'medium' | 'low',
  remarks: string,
  accepted: boolean
): Data {
  return {
    task,
    status,
    timeSpent,
    dueDate: new Date(dueDate),
    priority,
    remarks,
    accepted,
  };
}

const rows: Data[] = [
  createData(
    'Design Login Page',
    'in progress',
    5,

    '2024-07-20',
    'high',
    'Important',
    true
  ),
  createData(
    'Implement Auth',
    'completed',
    10,
    '2024-07-15',
    'medium',
    'Requires review',
    true
  ),
  createData(
    'Create Dashboard',
    'not started',
    0,
    '2024-07-30',
    'high',
    'Pending start',
    false
  ),
  createData(
    'Setup CI/CD',
    'in progress',
    8,
    '2024-07-25',
    'medium',
    'In progress',
    true
  ),
  createData(
    'Write Unit Tests',
    'not started',
    0,
    '2024-07-28',
    'low',
    'Pending start',
    false
  ),
];

const initialState = {
  rows: [],
  loading: false,
  error: null, 



  newTask: '',
};

export default function ColumnGroupingTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [state, setState] = React.useState(initialState);

  React.useEffect(() => {
    const fetchData = async () => {
      setState((prevState) => ({ ...prevState, loading: true }));
      try {
        const user = getUserFromLocalStorage();
        console.log(user);
        const response = await customFetch('/');
        const data = response.data;
        setState((prevState) => ({ ...prevState, rows: data, loading: false }));
      } catch (error) {
        console.log(error);
        // setState((prevState) => ({ ...prevState, error: error, loading: false }));
      }
    };
    fetchData();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => (
                <TableRow hover role='checkbox' tabIndex={-1} key={rowIndex}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value instanceof Date
                          ? value.toLocaleDateString()
                          : value.toString()}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
          
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
