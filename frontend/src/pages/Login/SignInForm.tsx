import {
  Button,
  Checkbox,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const SignInForm = () => {
  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
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
      <Typography padding="20px 0px 30px 0px" variant="h4">
        Sign in
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name="email"
            control={control}
            rules={{ required: 'Email is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                fullWidth
                error={!!error}
                autoComplete="email"
                variant="outlined"
                label="Email"
                type="email"
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
                autoFocus
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
        </Stack>
      </form>

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
    </Container>
  );
};
