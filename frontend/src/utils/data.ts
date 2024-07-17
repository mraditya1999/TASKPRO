// data.ts
export interface Data {
  task: string;
  status: 'not started' | 'in progress' | 'completed';
  timeSpent: number;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
  remarks: string;
  accepted: boolean;
}

export function createData(
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

export const rows: Data[] = [
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
