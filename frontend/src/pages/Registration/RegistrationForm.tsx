import {
  Button,
  Checkbox,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import styles from './registration.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { TermsAndConditions } from './TermsAndConditions';
import { registerUser } from '../../api';

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAndConditionsRead: boolean;
}

export const RegistrationForm = () => {
  const [isTermsAndConditionsOpen, setIsTermsAndConditionsOpen] =
    useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAndConditionsRead: false,
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    const request = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    const response = await registerUser(request);
    if (response.status === 200) {
      alert('Registration successful! You can now log in.');
      navigate('/login');
    }
  };

  const openTermsAndConditions = () => {
    setIsTermsAndConditionsOpen(true);
  };

  const closeTermsAndConditions = () => {
    setIsTermsAndConditionsOpen(false);
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
      <Typography paddingTop="20px" variant="h3">
        Create Account
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <Typography
          style={{
            display: 'inline',
            fontSize: '16px',
            fontWeight: 'lighter',
          }}
        >
          Already have an account?
        </Typography>
        <Typography
          style={{
            marginLeft: '4px',
            display: 'inline',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          <Link to="/login">Sign in</Link>
        </Typography>
      </Stack>
      <form style={{ marginTop: '40px' }} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="center">
          <Controller
            name="username"
            control={control}
            rules={{ required: 'Username is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                className={styles['form-textfield']}
                error={!!error}
                autoComplete="username"
                variant="outlined"
                label="Username"
                type="text"
                autoFocus
                helperText={error ? error.message : null}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{ required: 'Email is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                className={styles['form-textfield']}
                error={!!error}
                autoComplete="email"
                variant="outlined"
                label="Email"
                type="email"
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
                className={styles['form-textfield']}
                error={!!error}
                variant="outlined"
                label="Password"
                type="password"
                helperText={error ? error.message : null}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            rules={{ required: 'Confirm password is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                className={styles['form-textfield']}
                error={!!error}
                variant="outlined"
                label="Confirm password"
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
              marginTop: '16px',
            }}
          >
            <Controller
              name="termsAndConditionsRead"
              control={control}
              rules={{
                required:
                  'You need to agree to Terms & Conditions to register.',
              }}
              render={({ field }) => <Checkbox {...field} size="small" />}
            />

            <Stack direction="row" spacing={0.5}>
              <Typography>I've read & agree to</Typography>
              <Typography
                component="a"
                style={{
                  fontWeight: '500',
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                }}
                onClick={openTermsAndConditions}
              >
                Terms & Conditions
              </Typography>
            </Stack>
          </div>
          {!!errors.termsAndConditionsRead?.message && (
            <Typography
              style={{ marginTop: 0, fontSize: '12px', color: '#d32f2f' }}
            >
              {errors.termsAndConditionsRead.message}
            </Typography>
          )}
          <div>
            <Button
              type="submit"
              style={{
                marginTop: '10px',
                padding: '5px 40px',
                borderRadius: '5px',
                border: '1px solid grey',
                backgroundColor: '#1976d2',
                color: 'white',
                fontSize: '18px',
                textTransform: 'none',
              }}
            >
              Submit
            </Button>
          </div>
        </Stack>
      </form>
      <TermsAndConditions
        isOpen={isTermsAndConditionsOpen}
        onClose={closeTermsAndConditions}
      />
    </Container>
  );
};
