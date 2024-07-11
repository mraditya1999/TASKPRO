import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { LoginForm } from '../components';

const LoginPage = () => {
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <LoginForm />
    </Container>
  );
};
export default LoginPage;
