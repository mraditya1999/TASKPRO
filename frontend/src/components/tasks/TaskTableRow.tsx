import React from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { IRow } from '../../utils/types';

type TaskTableRowProps = {
  row: IRow;
  handleEditClick: () => void;
  handleDeleteClick: () => void;
};

const TaskTableRow: React.FC<TaskTableRowProps> = ({
  row,
  handleEditClick,
  handleDeleteClick,
}) => {
  return (
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
        <IconButton onClick={handleEditClick}>
          <Edit />
        </IconButton>
        <IconButton onClick={handleDeleteClick}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default TaskTableRow;
