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
  {
    id: 1,
    href: ROUTES.HOME,
    text: 'Home',
  },
  {
    id: 2,
    href: ROUTES.DASHBOARD,
    text: 'Dashboard',
  },
  {
    id: 3,
    href: ROUTES.ABOUT,
    text: 'About',
  },
  {
    id: 4,
    href: ROUTES.CONTACT,
    text: 'Contact',
  },
];
