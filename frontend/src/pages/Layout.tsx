import { AppBar, MenuItem, Toolbar } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const PAGES = ['Home', 'Courses', 'Users'];

const Layout: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        {PAGES.map(page => (
          <MenuItem key={page}>
            <Link
              style={{ textDecoration: 'none', color: 'white' }}
              to={`/${page === 'Home' ? '' : page}`}
            >
              {page}
            </Link>
          </MenuItem>
        ))}
      </Toolbar>
    </AppBar>
  );
};
export default Layout;
