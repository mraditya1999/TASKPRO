import { Outlet } from 'react-router-dom';
import { Footer, Header, ProtectedRoute } from '../components';

const LayoutPage = () => {
  return (
    <ProtectedRoute>
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    </ProtectedRoute>
  );
};

export default LayoutPage;
