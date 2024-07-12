import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { NavLink } from 'react-router-dom';
import { Link } from '@mui/material';

const LoginForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin='normal'
        required
        fullWidth
        id='email'
        label='Email Address'
        name='email'
        autoComplete='email'
        autoFocus
      />
      <TextField
        margin='normal'
        required
        fullWidth
        name='password'
        label='Password'
        type='password'
        id='password'
        autoComplete='current-password'
      />
      <FormControlLabel
        control={<Checkbox value='remember' color='primary' />}
        label='Remember me'
      />
      <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
        Login
      </Button>
      <Grid container>
        <Grid item xs>
          <Link component={NavLink} to='/forget-password' variant='body1'>
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link component={NavLink} to='/register'>
            {"Don't have an account? Register"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};
export default LoginForm;
