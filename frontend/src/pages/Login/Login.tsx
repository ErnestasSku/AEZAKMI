import { Container, Grid, Stack, Typography } from '@mui/material';
import { SignInForm } from './SigninForm';

const Login = () => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{ backgroundColor: '#BADEFC' }}
    >
      <Grid
        alignItems="center"
        justifyContent="center"
        display="flex"
        item
        sm={10}
        xs={10}
      >
        <Grid container spacing={10}>
          <Grid item xs={7}>
            <Container>
              <Stack spacing={8}>
                <img
                  style={{
                    maxWidth: '550px',
                    objectFit: 'cover',
                    height: '160px',
                  }}
                  src="https://cdn.logojoy.com/wp-content/uploads/2018/05/01144812/1863-768x591.png"
                ></img>
                <Typography variant="h3" style={{ textAlign: 'left' }}>
                  Education sharing for everyone
                </Typography>
              </Stack>
            </Container>
          </Grid>
          <Grid item xs={5}>
            <SignInForm />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
