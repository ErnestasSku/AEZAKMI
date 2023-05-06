import {
  Button,
  Checkbox,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

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
            <Container
              style={{
                backgroundColor: 'white',
                padding: '16px 30px',
                border: '1px solid grey',
                borderRadius: '5px',
              }}
            >
              <Typography padding="20px 0px 30px 0px" variant="h4">
                Sign in
              </Typography>

              <Stack spacing={2}>
                <TextField
                  required
                  fullWidth
                  autoComplete="email"
                  variant="outlined"
                  id="email"
                  label="Email"
                  type="email"
                  autoFocus
                />
                <TextField
                  required
                  fullWidth
                  autoComplete="current-password"
                  variant="outlined"
                  id="password"
                  label="Password"
                  type="password"
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '8px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox
                      size="small"
                      value="remember"
                      color="primary"
                      style={{ marginLeft: '0px' }}
                    />
                    <span style={{ fontSize: '14px' }}>Remember me</span>
                  </div>

                  <Typography
                    component="a"
                    style={{
                      fontSize: '14px',
                      fontWeight: 'lighter',
                      cursor: 'pointer',
                    }}
                  >
                    Forgot password?
                  </Typography>
                </div>
                <Container style={{ marginTop: '0px' }}>
                  <Button
                    type="submit"
                    style={{
                      fontWeight: '400',
                      padding: '5px 40px',
                      borderRadius: '5px',
                      border: '1px solid grey',
                      backgroundColor: 'lightgrey',
                      color: 'black',
                      maxWidth: '50px',
                      textTransform: 'none',
                    }}
                  >
                    Login
                  </Button>
                </Container>
                <div style={{ marginTop: '20px' }}>
                  <Typography
                    style={{
                      display: 'inline',
                      fontSize: '14px',
                      fontWeight: 'lighter',
                      cursor: 'pointer',
                    }}
                  >
                    Not a member yet?
                  </Typography>
                  <Typography
                    component={'a'}
                    style={{
                      marginLeft: '4px',
                      display: 'inline',
                      fontSize: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    Create account now!
                  </Typography>
                </div>
              </Stack>
            </Container>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
