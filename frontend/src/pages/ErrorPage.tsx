import { Box, Button, Grid, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <Grid
      sx={{
        display: 'grid',
        placeItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          variant='h1'
          sx={{
            fontWeight: 900,
            fontSize: '10rem',
            textAlign: 'center',
          }}
          component='h2'
        >
          404
        </Typography>
        <Typography
          variant='body1'
          color='initial'
          sx={{ textTransform: 'uppercase' }}
        >
          We are sorry, but the page you request was not found
        </Typography>
        <Button
          component={NavLink}
          to='/'
          variant='contained'
          sx={{ marginTop: '2rem' }}
        >
          Go Home
        </Button>
      </Box>
    </Grid>
  );
};
export default ErrorPage;
