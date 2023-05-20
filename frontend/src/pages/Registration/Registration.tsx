import { Container, Stack, Typography } from '@mui/material';
import { RegistrationForm } from './RegistrationForm';

const Registration = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        margin: '0px',
        backgroundColor: '#BADEFC',
        padding: '60px 80px',
      }}
    >
      <Container sx={{ marginBottom: '50px' }}>
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
      <Container>
        <RegistrationForm />
      </Container>
    </div>
  );
};

export default Registration;
