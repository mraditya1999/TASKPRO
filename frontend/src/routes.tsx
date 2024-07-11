import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { LayoutPage, LoginPage, RegisterPage } from './pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<LayoutPage />}>
        <Route index element={<h1>Home Page</h1>} />
        <Route path='about' element={<h1>About Page</h1>} />
        <Route path='contact' element={<h1>Contact Page</h1>} />
      </Route>
      <Route path='*' element={<h1>Error Page</h1>} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
    </>
  )
);

export default router;
