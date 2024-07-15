import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import {
  LayoutPage,
  LoginPage,
  RegisterPage,
  ErrorPage,
  ForgetPasswordPage,
  DashboardPage,
} from './pages';
import { ROUTES } from './utils';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={ROUTES.HOME} element={<LayoutPage />}>
        <Route index element={<h1>Home Page</h1>} />
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTES.ABOUT} element={<h1>About Page</h1>} />
        <Route path={ROUTES.CONTACT} element={<h1>Contact Page</h1>} />
      </Route>
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.FORGET_PASSWORD} element={<ForgetPasswordPage />} />
      <Route path={ROUTES.ERROR} element={<ErrorPage />} />
    </>
  )
);

export default router;
