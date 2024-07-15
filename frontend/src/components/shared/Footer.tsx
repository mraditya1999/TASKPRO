import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { Box } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
      }}
    >
      <Container
        maxWidth='sm'
        sx={{
          textAlign: 'center',
        }}
      >
        {/* Copyright */}
        <Typography variant='body2' color='text.secondary'>
          {'Copyright © '}
          <Link color='inherit' href='https://www.humancloud.ltd'>
            Humancloud Software Pvt ltd.
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
