import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { loginUser } from '../../features';
import { customFetch } from '../../utils/customFetch';
import { ROUTES } from '../../utils';
// components
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link } from '@mui/material';
import toast from 'react-hot-toast';

const initialFormValues = {
  email: '',
  password: '',
  rememberMe: false,
};

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, rememberMe } = formValues;
    if (!email || !password) {
      toast.error('All fields are required');
      return;
    }

    try {
      const response = await customFetch.post('/user/login', {
        email,
        password,
      });
      dispatch(loginUser({ ...response.data.data, rememberMe }));
      if (rememberMe) {
        localStorage.setItem('rememberMe', JSON.stringify(rememberMe));
      } else {
        localStorage.removeItem('rememberMe');
      }
      navigate(ROUTES.HOME);
    } catch (error) {
      const errorMessage =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error as any).response?.data?.error ||
        'Login failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      {/* Email */}
      <TextField
        margin='normal'
        required
        fullWidth
        id='email'
        label='Email Address'
        name='email'
        autoComplete='email'
        autoFocus
        value={formValues.email}
        onChange={handleChange}
      />

      {/* Password */}
      <TextField
        margin='normal'
        required
        fullWidth
        name='password'
        label='Password'
        type='password'
        id='password'
        autoComplete='current-password'
        value={formValues.password}
        onChange={handleChange}
      />

      {/* Remember Me */}
      <FormControlLabel
        control={
          <Checkbox
            value='remember'
            color='primary'
            name='rememberMe'
            checked={formValues.rememberMe}
            onChange={handleChange}
          />
        }
        label='Remember me'
      />

      {/* Login */}
      <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
        Login
      </Button>

      {/* Links */}
      <Grid container>
        <Grid item xs>
          <Link component={NavLink} to={ROUTES.FORGET_PASSWORD} variant='body1'>
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link component={NavLink} to={ROUTES.REGISTER}>
            {"Don't have an account? Register"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginForm;
