import { Person, VideoCameraBack } from '@mui/icons-material';
import { AppBar, Button, MenuItem, Toolbar } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const PAGES = ['Home', 'Courses', 'Users', 'Videos'];

const Layout: React.FC = () => {
  return (
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
        <div style={{ display: 'flex', alignContent: 'center', gap: '30px' }}>
          <Link to={'/videos/upload'}>
            <Button
              style={{ backgroundColor: 'white', color: 'black' }}
              variant="contained"
              startIcon={<VideoCameraBack />}
            >
              Upload video
            </Button>
          </Link>
          <Link
            to={'/login'}
            style={{ outline: 0, color: 'white', display: 'flex' }}
          >
            <Person>Login</Person>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};
export default Layout;
