import React from 'react';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { IRow } from '../../utils/types';

type TaskTableHeaderProps = {
  sortField: keyof IRow;
  sortOrder: 'asc' | 'desc';
  handleSort: (field: keyof IRow) => void;
};

const TaskTableHeader: React.FC<TaskTableHeaderProps> = ({
  sortField,
  sortOrder,
  handleSort,
}) => {
  const columns = [
    { field: 'task', label: 'Task', sortable: false },
    { field: 'status', label: 'Status' },
    { field: 'timeSpend', label: 'Time Spend (minutes)' },
    { field: 'dueDate', label: 'Due Date' },
    { field: 'priority', label: 'Priority' },
    { field: 'remarks', label: 'Remarks', sortable: false },
    { field: 'accepted', label: 'Accepted' },
    { field: 'action', label: 'Action', sortable: false },
  ];

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell key={column.field}>
            {column.sortable !== false ? (
              <TableSortLabel
                active={sortField === column.field}
                direction={sortOrder}
                onClick={() => handleSort(column.field as keyof IRow)}
              >
                {column.label}
              </TableSortLabel>
            ) : (
              column.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TaskTableHeader;
