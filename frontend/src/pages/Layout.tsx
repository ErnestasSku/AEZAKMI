import { Add, Logout, VideoCameraBack } from '@mui/icons-material';
import {
  AppBar,
  Button,
  IconButton,
  MenuItem,
  Stack,
  Toolbar,
} from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { roleToString } from '../utils/role';

const PAGES = ['Courses', 'Videos'];

const Layout: React.FC = () => {
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = () => {
    if (confirm('Are you sure you want to log out?')) {
      logout();
      navigate('/login');
    }
  };

  return isLoggedIn ? (
    <AppBar position="static">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex' }}>
          {PAGES.map(page => (
            <MenuItem key={page}>
              <Link
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  fontSize: '1.1rem',
                }}
                to={page.toLowerCase()}
              >
                {page}
              </Link>
            </MenuItem>
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
            gap: '30px',
          }}
        >
          {user?.role != 'USER' && (
            <>
              <Link to={'/courses/create'}>
                <Button
                  style={{ backgroundColor: 'white', color: 'black' }}
                  variant="contained"
                  startIcon={<Add />}
                >
                  Create course
                </Button>
              </Link>
              <Link to={'/videos/upload'}>
                <Button
                  style={{ backgroundColor: 'white', color: 'black' }}
                  variant="contained"
                  startIcon={<VideoCameraBack />}
                >
                  Upload video
                </Button>
              </Link>
            </>
          )}

          <>
            <Stack>
              <div style={{ fontSize: '1.3rem', fontWeight: 'bolder' }}>
                {user?.username}
              </div>
              <div style={{ fontSize: '0.9rem' }}>
                {roleToString(user?.role)}
              </div>
            </Stack>
            <IconButton style={{ color: 'white' }} onClick={logoutHandler}>
              <Logout>Logout</Logout>
            </IconButton>
          </>
        </div>
      </Toolbar>
    </AppBar>
  ) : null;
};
export default Layout;
