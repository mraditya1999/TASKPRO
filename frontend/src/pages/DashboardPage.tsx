import { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts';
import { IRow } from '../utils/types';

const generateRandomTasks = (numTasks: number): IRow[] => {
  const tasks: IRow[] = [];

  const statuses: IRow['status'][] = [
    'Not Yet Started',
    'In Progress',
    'Completed',
  ];
  const priorities: IRow['priority'][] = ['Low', 'Medium', 'High']; // Define priorities explicitly

  for (let i = 1; i <= numTasks; i++) {
    const randomStatus = statuses[
      Math.floor(Math.random() * statuses.length)
    ] as IRow['status'];
    const randomPriority = priorities[
      Math.floor(Math.random() * priorities.length)
    ] as IRow['priority'];
    const randomTimeSpend = Math.floor(Math.random() * 10); // Random time spend (0-9)
    const randomDueDate = Math.random() > 0.5 ? '2024-07-31' : null; // 50% chance of having a due date
    const randomRemarks = Math.random() > 0.5 ? 'Some remarks' : '';

    const task: IRow = {
      id: `task-${i}`,
      task: `Task ${i}`,
      status: randomStatus,
      timeSpend: randomTimeSpend,
      dueDate: randomDueDate,
      priority: randomPriority,
      remarks: randomRemarks,
      accepted: false,
      isEditing: false,
    };

    tasks.push(task);
  }

  return tasks;
};

const DashboardPage = () => {
  // State to hold chart data
  const [taskData, setTaskData] = useState([
    { name: 'Completed', completed: 0, pending: 0, notStarted: 0 },
    { name: 'Pending', completed: 0, pending: 0, notStarted: 0 },
    { name: 'Not Yet Started', completed: 0, pending: 0, notStarted: 0 },
  ]);

  const [productivityData, setProductivityData] = useState([
    { day: 'Mon', tasksCompleted: 8 },
    { day: 'Tue', tasksCompleted: 6 },
    { day: 'Wed', tasksCompleted: 7 },
    { day: 'Thu', tasksCompleted: 9 },
    { day: 'Fri', tasksCompleted: 5 },
  ]);

  // Simulate fetching data effect
  useEffect(() => {
    // Generate random tasks
    const generatedTasks = generateRandomTasks(20); // Generate 20 random tasks
    const completedCount = generatedTasks.filter(
      (task) => task.status === 'Completed'
    ).length;
    const pendingCount = generatedTasks.filter(
      (task) => task.status === 'In Progress'
    ).length;
    const notStartedCount = generatedTasks.filter(
      (task) => task.status === 'Not Yet Started'
    ).length;

    // Update taskData state based on counts
    setTaskData([
      {
        name: 'Completed',
        completed: completedCount,
        pending: 0,
        notStarted: 0,
      },
      { name: 'Pending', completed: 0, pending: pendingCount, notStarted: 0 },
      {
        name: 'Not Yet Started',
        completed: 0,
        pending: 0,
        notStarted: notStartedCount,
      },
    ]);

    // Here you can update productivityData based on actual productivity metrics if needed
  }, []); // Dependency array is empty to simulate a one-time effect

  return (
    <div>
      <Typography variant='h4' gutterBottom>
        Task Manager Dashboard
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant='h6' gutterBottom>
          Tasks Overview
        </Typography>
        <BarChart
          width={600}
          height={300}
          data={taskData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='completed' fill='#82ca9d' />
          <Bar dataKey='pending' fill='#f44336' />
          <Bar dataKey='notStarted' fill='#ffc658' />
        </BarChart>
      </Box>

      <Box>
        <Typography variant='h6' gutterBottom>
          Weekly Productivity
        </Typography>
        <LineChart
          width={600}
          height={300}
          data={productivityData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='day' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type='monotone'
            dataKey='tasksCompleted'
            stroke='#8884d8'
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </Box>
    </div>
  );
};

export default DashboardPage;
