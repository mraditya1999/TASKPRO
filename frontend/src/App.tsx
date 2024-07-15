import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { Provider } from 'react-redux';
import { store } from './store';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster containerStyle={{ textTransform: 'capitalize' }} />
    </Provider>
  );
};
export default App;
