import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { customFetch } from '../../utils/customFetch';
import { ROUTES } from '../../utils';
// components
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';
import toast from 'react-hot-toast';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState(initialValues);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password } = formValues;
    if (!name || !email || !password) {
      toast.error('All field are required');
      return;
    }

    try {
      await customFetch.post('/user/register', formValues);
      toast.success('Registered successfully');
      navigate(ROUTES.LOGIN);
    } catch (error) {
      const errorMessage =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error as any).response?.data?.error ||
        'Registration failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        {/* Name */}
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id='name'
            label='Name'
            name='name'
            autoComplete='name'
            onChange={handleChange}
            value={formValues.name}
          />
        </Grid>

        {/* Email */}
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            onChange={handleChange}
            value={formValues.email}
          />
        </Grid>

        {/* Password */}
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='new-password'
            onChange={handleChange}
            value={formValues.password}
          />
        </Grid>
      </Grid>

      {/* Submit Button */}
      <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
        Register
      </Button>

      {/* Links */}
      <Grid container justifyContent='flex-end'>
        <Grid item>
          <Link component={NavLink} to={ROUTES.LOGIN} variant='body1'>
            Already have an account? Login
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegisterForm;
