import React, { useState } from 'react';
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
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Delete, Edit, Save } from '@mui/icons-material';
import { IRow } from '../utils/types';

// Function to create a row with default values
const createData = (
  task: string,
  status: 'Not Yet Started' | 'In Progress' | 'Completed' = 'Not Yet Started',
  timeSpent: number = 0,
  dueDate: Date | null = null,
  priority: 'High' | 'Medium' | 'Low' = 'Medium',
  remarks: string = '',
  accepted: 'Yes' | 'No' = 'No'
): IRow => ({
  task,
  status,
  timeSpent,
  dueDate,
  priority,
  remarks,
  accepted,
  isEditing: false,
});

// Initial rows data with type safety
const initialRows: IRow[] = [
  createData(
    'Task 1',
    'Not Yet Started',
    0,
    new Date('2024-07-20'),
    'Medium',
    'No remarks',
    'No'
  ),
  createData(
    'Task 2',
    'In Progress',
    30,
    new Date('2024-07-25'),
    'High',
    'Need to finish by end of week',
    'No'
  ),
  createData(
    'Task 3',
    'Completed',
    120,
    new Date('2024-07-15'),
    'Low',
    'Completed successfully',
    'Yes'
  ),
  createData(
    'Task 4',
    'Not Yet Started',
    0,
    new Date('2024-07-30'),
    'Medium',
    'Pending review',
    'No'
  ),
  createData(
    'Task 5',
    'In Progress',
    45,
    new Date('2024-07-22'),
    'High',
    'On track',
    'No'
  ),
];

const TaskTable: React.FC = () => {
  const [rows, setRows] = useState<IRow[]>(initialRows);

  const handleEditClick = (index: number) => {
    setRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index ? { ...row, isEditing: true } : row
      )
    );
  };

  const handleSaveClick = (index: number) => {
    setRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index ? { ...row, isEditing: false } : row
      )
    );
  };

  const handleDeleteClick = (index: number) => {
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  const handleInputChange = (
    index: number,
    field: keyof IRow,
    value: string | number | Date | null
  ) => {
    setRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index ? { ...row, [field]: value as never } : row
      )
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Time Spent (minutes)</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell>Accepted</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  {row.isEditing ? (
                    <TextField
                      value={row.task}
                      onChange={(e) =>
                        handleInputChange(index, 'task', e.target.value)
                      }
                    />
                  ) : (
                    row.task
                  )}
                </TableCell>
                <TableCell>
                  {row.isEditing ? (
                    <Select
                      value={row.status}
                      onChange={(e) =>
                        handleInputChange(index, 'status', e.target.value)
                      }
                    >
                      <MenuItem value='Not Yet Started'>
                        Not Yet Started
                      </MenuItem>
                      <MenuItem value='In Progress'>In Progress</MenuItem>
                      <MenuItem value='Completed'>Completed</MenuItem>
                    </Select>
                  ) : (
                    row.status
                  )}
                </TableCell>
                <TableCell>
                  {row.isEditing ? (
                    <TextField
                      type='number'
                      value={row.timeSpent}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          'timeSpent',
                          Number(e.target.value)
                        )
                      }
                    />
                  ) : (
                    row.timeSpent
                  )}
                </TableCell>
                <TableCell>
                  {row.isEditing ? (
                    <DatePicker
                      value={row.dueDate}
                      onChange={(date) =>
                        handleInputChange(index, 'dueDate', date)
                      }
                      //   renderInput={(params) => <TextField {...params} />}
                    />
                  ) : (
                    row.dueDate?.toLocaleDateString() || ''
                  )}
                </TableCell>
                <TableCell>
                  {row.isEditing ? (
                    <Select
                      value={row.priority}
                      onChange={(e) =>
                        handleInputChange(index, 'priority', e.target.value)
                      }
                    >
                      <MenuItem value='High'>High</MenuItem>
                      <MenuItem value='Medium'>Medium</MenuItem>
                      <MenuItem value='Low'>Low</MenuItem>
                    </Select>
                  ) : (
                    row.priority
                  )}
                </TableCell>
                <TableCell>
                  {row.isEditing ? (
                    <TextField
                      value={row.remarks}
                      onChange={(e) =>
                        handleInputChange(index, 'remarks', e.target.value)
                      }
                    />
                  ) : (
                    row.remarks
                  )}
                </TableCell>
                <TableCell>{row.accepted}</TableCell>
                <TableCell>
                  {row.isEditing ? (
                    <IconButton onClick={() => handleSaveClick(index)}>
                      <Save />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => handleEditClick(index)}>
                      <Edit />
                    </IconButton>
                  )}
                  <IconButton onClick={() => handleDeleteClick(index)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </LocalizationProvider>
  );
};

export default TaskTable;
