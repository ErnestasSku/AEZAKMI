import { Logout, VideoCameraBack } from '@mui/icons-material';
import { AppBar, Button, IconButton, MenuItem, Toolbar } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PAGES = ['Home', 'Courses', 'Users', 'Videos'];

const Layout: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
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
                style={{ textDecoration: 'none', color: 'white' }}
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
          <Link to={'/videos/upload'}>
            <Button
              style={{ backgroundColor: 'white', color: 'black' }}
              variant="contained"
              startIcon={<VideoCameraBack />}
            >
              Upload video
            </Button>
          </Link>
          <IconButton style={{ color: 'white' }} onClick={logoutHandler}>
            <Logout>Logout</Logout>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  ) : null;
};
export default Layout;
