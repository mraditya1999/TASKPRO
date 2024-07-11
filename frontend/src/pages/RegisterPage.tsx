import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { RegisterForm } from '../components';

const RegisterPage = () => {
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <RegisterForm />
    </Container>
  );
};

export default RegisterPage;
