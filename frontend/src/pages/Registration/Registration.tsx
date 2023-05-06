import { Container, Grid, Stack, Typography } from '@mui/material';
import { RegistrationForm } from './RegistrationForm';

const Registration = () => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{ backgroundColor: '#BADEFC' }}
      rowSpacing={0}
    >
      <Grid item sm={10}>
        <Container>
          <Stack direction="row" alignItems="center" spacing={2}>
            <img
              style={{
                width: '100vw',
                maxWidth: '480px',
                backgroundColor: 'white',
                objectFit: 'cover',
                height: '140px',
              }}
              src="https://cdn.logojoy.com/wp-content/uploads/2018/05/01144812/1863-768x591.png"
            ></img>
            <Typography
              variant="h3"
              style={{ textAlign: 'right', fontFamily: 'Roboto Slab' }}
            >
              Education sharing for everyone
            </Typography>
          </Stack>
        </Container>
      </Grid>
      <Grid
        alignItems="center"
        justifyContent="center"
        display="flex"
        item
        sm={10}
      >
        <RegistrationForm />
      </Grid>
    </Grid>
  );
};

export default Registration;
