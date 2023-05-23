import {
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useQuery } from 'react-query';
import { fetchAllUsers } from '../../api';

export const UsersList = () => {
  const { data, isLoading } = useQuery('users', () => fetchAllUsers());

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Stack sx={{ width: '80%', alignSelf: 'center' }}>
      <Typography textAlign={'left'} variant="h5">
        All users ({data?.data.flatMap(x => x).length}):
      </Typography>
      <List>
        {data?.data.map(user => (
          <ListItem
            secondaryAction={
              <ListItemButton sx={{ textAlign: 'right' }}>
                Assign teacher
              </ListItemButton>
            }
            divider
            key={user.email}
          >
            <ListItemText
              primary={user.username}
              secondary={user.email}
            ></ListItemText>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};
