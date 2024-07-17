export interface IUser {
  id: string;
  name: string;
  email: string;
  role?: string;
  token?: string;
}

export interface IUserResponse {
  data: IUser | null;
  status?: string;
  rememberMe?: boolean;
}

export interface IRow {
  task: string;
  status: 'Not Yet Started' | 'In Progress' | 'Completed';
  timeSpent: number;
  dueDate: Date | null;
  priority: 'High' | 'Medium' | 'Low';
  remarks: string;
  accepted: 'Yes' | 'No';
  isEditing: boolean;
}
