import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';
import { customFetch } from '../../utils/customFetch';

const RegisterForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const name = data.get('name');
    const email = data.get('email');
    const password = data.get('password');

    if (!name || !email || !password)
      return console.log('All field are required');

    try {
      await customFetch.post('/user/register', {
        name,
        email,
        password,
      });
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id='name'
            label='Name'
            name='name'
            autoComplete='name'
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='new-password'
          />
        </Grid>
      </Grid>
      <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
        Register
      </Button>
      <Grid container justifyContent='flex-end'>
        <Grid item>
          <Link component={NavLink} to='/login' variant='body1'>
            Already have an account? Login
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};
export default RegisterForm;
