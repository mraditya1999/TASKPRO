import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { LoginForm } from '../components';

const LoginPage = () => {
  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            'url("/static/images/templates/templates-images/sign-in-side-bg.png")',

          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'left',
        }}
      />
      <LoginForm />
    </Grid>
  );
};
export default LoginPage;
