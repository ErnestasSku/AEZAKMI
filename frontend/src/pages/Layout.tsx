import { Person } from '@mui/icons-material';
import { AppBar, MenuItem, Toolbar } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const PAGES = ['Home', 'Courses', 'Users'];

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
        <Link
          to={'/login'}
          style={{ outline: 0, color: 'white', display: 'flex' }}
        >
          <Person>Login</Person>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
export default Layout;
