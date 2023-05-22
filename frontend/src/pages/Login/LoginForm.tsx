import {
  Button,
  Checkbox,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

type FormData = {
  username: string;
  password: string;
  rememberMe: boolean;
};

export const LoginForm = () => {
  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: { username: '', password: '', rememberMe: false },
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async ({ username, password }: FormData) => {
    try {
      await login(username, password);
    } catch (e) {
      alert('Wrong username or password');
      return;
    }
    navigate('/');
  };

  return (
    <Container
      style={{
        backgroundColor: 'white',
        padding: '16px 30px',
        border: '1px solid grey',
        borderRadius: '5px',
      }}
    >
      <Typography
        padding="20px 0px 30px 0px"
        variant="h4"
        fontFamily="Roboto Slab"
      >
        Sign in
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name="username"
            control={control}
            rules={{ required: 'Username is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                fullWidth
                error={!!error}
                autoComplete="username"
                variant="outlined"
                label="Username"
                type="username"
                autoFocus
                helperText={error ? error.message : null}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{ required: 'Password is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                fullWidth
                error={!!error}
                autoComplete="current-password"
                variant="outlined"
                label="Password"
                type="password"
                helperText={error ? error.message : null}
              />
            )}
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
              <Controller
                name="rememberMe"
                control={control}
                render={({ field }) => (
                  <Checkbox {...field} checked={field.value} size="small" />
                )}
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
          <Container style={{ marginTop: '8px' }}>
            <Button
              type="submit"
              style={{
                padding: '5px 40px',
                borderRadius: '5px',
                border: '1px solid grey',
                backgroundColor: '#1976d2',
                color: 'white',
                fontSize: '18px',
                textTransform: 'none',
              }}
            >
              Login
            </Button>
          </Container>
        </Stack>
      </form>

      <div style={{ marginTop: '20px' }}>
        <Typography
          style={{
            display: 'inline',
            fontSize: '14px',
            fontWeight: 'lighter',
          }}
        >
          Not a member yet?
        </Typography>
        <Typography
          style={{
            marginLeft: '4px',
            display: 'inline',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          <Link to="/registration">Create account now!</Link>
        </Typography>
      </div>
    </Container>
  );
};
