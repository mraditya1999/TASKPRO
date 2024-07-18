export interface IUser {
  id: string;
  name: string;
  email: string;
  role?: string;
  token?: string;
}

export interface IUserState {
  user: IUser | null;
  status?: string;
  rememberMe?: boolean;
}

export interface IRow {
  id: string;
  task: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  timeSpend: number;
  dueDate: string | null;
  priority: 'High' | 'Medium' | 'Low';
  remarks: string;
  accepted: boolean;
  isEditing: boolean;
}
