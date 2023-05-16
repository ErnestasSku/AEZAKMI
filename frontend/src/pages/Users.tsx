import { Person } from '@mui/icons-material';
import { List, ListItem, ListItemIcon, Typography } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import { User, fetchAllUsers } from '../api';
import { withPrivateRoute } from '../components/PrivateRoute';

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await fetchAllUsers();
      setUsers(data);
    }
    fetchData();
  }, []);

  return (
    <>
      <Typography variant="h4">All Registered Users</Typography>
      <List style={{ display: 'flex', flexDirection: 'column' }}>
        {users.map(user => (
          <ListItem
            key={user.id}
            alignItems="center"
            style={{ justifyContent: 'center' }}
          >
            <ListItemIcon sx={{ color: 'white' }}>
              <Person />
            </ListItemIcon>
            {user.username} ({user.email} {user.password})
          </ListItem>
        ))}
      </List>
    </>
  );
};
export default withPrivateRoute(Users);
