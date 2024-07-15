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
  AboutPage,
  ContactPage,
  HomePage,
} from './pages';
import { ROUTES } from './utils';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={ROUTES.HOME} element={<LayoutPage />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.CONTACT} element={<ContactPage />} />
      </Route>
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.FORGET_PASSWORD} element={<ForgetPasswordPage />} />
      <Route path={ROUTES.ERROR} element={<ErrorPage />} />
    </>
  )
);

export default router;
