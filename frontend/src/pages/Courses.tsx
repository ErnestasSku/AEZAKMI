import { CircularProgress, List, ListItem, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { fetchAllUsers } from '../api';

const Courses: React.FC = () => {
  const { data, isLoading } = useQuery('users', fetchAllUsers);

  return (
    <>
      <Typography variant="h4">All users (with React Query)</Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <List>
          {data?.data.map(user => (
            <ListItem>{user.email}</ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default Courses;
