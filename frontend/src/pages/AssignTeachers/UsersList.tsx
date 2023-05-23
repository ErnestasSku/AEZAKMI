import {
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useMutation, useQuery } from 'react-query';
import { FullUser, assignUserToTeacher, fetchAllUsers } from '../../api';
import { Person, School, VerifiedUser } from '@mui/icons-material';
import { AxiosResponse } from 'axios';
import { AxiosError } from 'axios';
import { roleToString } from '../../utils/role';

export const UsersList = () => {
  const { data, isLoading, refetch } = useQuery('users', () => fetchAllUsers());

  const { mutate } = useMutation(
    (user: FullUser) => assignUserToTeacher(user),
    {
      onError: (error: AxiosError) => {
        if (error?.response?.status === 409) {
          alert('Stale data, refreshing the data...');
          refetch();
        }
      },
      onSuccess: (response: AxiosResponse) => {
        if (response.status === 200) {
          alert('User assigned as teacher successfully!');
          refetch();
        }
      },
    }
  );

  const onClickAssignTeacher = (user: FullUser) => {
    mutate(user);
  };

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
            key={user.id}
            secondaryAction={
              user.role.type === 'USER' ? (
                <ListItemButton
                  onClick={() => onClickAssignTeacher(user)}
                  color="green"
                  sx={{ textAlign: 'right' }}
                >
                  <Button color="success" variant="outlined">
                    Assign teacher
                  </Button>
                </ListItemButton>
              ) : null
            }
            divider
          >
            <ListItemIcon
              sx={{
                scale: '1.4',
                justifyContent: 'center',
                marginRight: '20px',
              }}
            >
              <Stack alignItems={'center'}>
                {user.role.type === 'TEACHER' ? (
                  <School />
                ) : user.role.type === 'ADMIN' ? (
                  <VerifiedUser />
                ) : (
                  <Person />
                )}
                <Typography
                  fontSize={'0.7rem'}
                  variant="body2"
                  color="text.secondary"
                >
                  {roleToString(user.role.type)}
                </Typography>
              </Stack>
            </ListItemIcon>
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
