import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../components';

const LayoutPage = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
export default LayoutPage;
