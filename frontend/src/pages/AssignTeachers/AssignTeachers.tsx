import { Stack } from '@mui/material';
import { withAdminRoute } from '../../components/AdminRoute';
import { PageHeader } from '../../components/PageHeader';
import { UsersList } from './UsersList';

const AssignTeachers = withAdminRoute(() => {
  return (
    <Stack maxWidth={'1400px'} margin="auto" alignItems={'center'}>
      <PageHeader title="Assign teachers" />
      <UsersList />
    </Stack>
  );
});

export default AssignTeachers;
