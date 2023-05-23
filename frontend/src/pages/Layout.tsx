import {
  Add,
  Logout,
  Menu as MenuIcon,
  PlayLesson,
  School,
  VideoCameraBack,
} from '@mui/icons-material';
import {
  AppBar,
  Button,
  IconButton,
  MenuItem,
  Stack,
  Toolbar,
  Menu,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { roleToString } from '../utils/role';

const PAGES = ['Courses', 'Videos'];

const Layout: React.FC = () => {
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const logoutHandler = () => {
    if (confirm('Are you sure you want to log out?')) {
      logout();
      navigate('/login');
    }
  };

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const onClickMyCourses = () => {
    closeMenu();
    navigate(`/courses?creatorId=${user!.id}`);
  };

  const onClickMyVideos = () => {
    closeMenu();
    navigate(`/videos?creatorId=${user!.id}`);
  };

  const onClickSignOut = () => {
    closeMenu();
    logoutHandler();
  };

  const onClickAssignTeachers = () => {
    closeMenu();
    console.log('ASSIGN TEACHERS');
  };

  const myCoursesItem = (
    <MenuItem key={'my-courses'} onClick={onClickMyCourses}>
      <ListItemIcon>
        <PlayLesson />
      </ListItemIcon>
      <ListItemText>My courses</ListItemText>
    </MenuItem>
  );
  const myVideosItem = (
    <MenuItem key={'my-videos'} onClick={onClickMyVideos}>
      <ListItemIcon>
        <VideoCameraBack />
      </ListItemIcon>
      <ListItemText>My videos</ListItemText>
    </MenuItem>
  );
  const signOutItem = (
    <MenuItem key={'sign-out'} onClick={onClickSignOut}>
      <ListItemIcon>
        <Logout />
      </ListItemIcon>
      <ListItemText>Sign out</ListItemText>
    </MenuItem>
  );
  const assignTeachersItem = (
    <MenuItem key={'assign-teachers'} onClick={onClickAssignTeachers}>
      <ListItemIcon>
        <School />
      </ListItemIcon>
      <ListItemText>Assign teachers</ListItemText>
    </MenuItem>
  );

  const menuItems = [
    user?.role === 'TEACHER' && [myCoursesItem, myVideosItem],
    user?.role === 'ADMIN' && [assignTeachersItem],
    signOutItem,
  ]
    .flat()
    .filter(Boolean);

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
            <IconButton style={{ color: 'white' }} onClick={openMenu}>
              <MenuIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={closeMenu}
              sx={{ outline: 'none' }}
              children={menuItems}
            />
          </>
        </div>
      </Toolbar>
    </AppBar>
  ) : null;
};
export default Layout;
