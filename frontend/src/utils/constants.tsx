import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export enum ROUTES {
  HOME = '/',
  ABOUT = '/about',
  CONTACT = '/contact',
  DASHBOARD = '/dashboard',
  LOGIN = '/login',
  REGISTER = '/register',
  FORGET_PASSWORD = '/forget-password',
  ERROR = '*',
}

export const routesList = [
  { id: 1, href: '/', text: 'Home', icon: <HomeOutlinedIcon /> },
  { id: 2, href: '/about', text: 'About', icon: <InfoOutlinedIcon /> },
  {
    id: 3,
    href: '/dashboard',
    text: 'Dashboard',
    icon: <DashboardOutlinedIcon />,
  },
  {
    id: 4,
    href: '/contact',
    text: 'Contact',
    icon: <PermContactCalendarOutlinedIcon />,
  },
];
