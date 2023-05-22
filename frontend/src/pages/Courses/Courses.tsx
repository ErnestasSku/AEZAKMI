import { Stack } from '@mui/material';
import { withPrivateRoute } from '../../components/PrivateRoute';
import { CoursesList } from './CoursesList';
import { PageHeader } from '../../components/PageHeader';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { Creator } from '../../api';

const Courses: React.FC = () => {
  const [searchParams] = useSearchParams();
  const client = useQueryClient();
  const creatorId = searchParams.get('creatorId') ?? undefined;
  const creator = client.getQueryData<Creator>(['creators', creatorId]);

  return (
    <Stack>
      <PageHeader
        title={`Courses${creator ? ` by user "${creator.username}"` : ''}`}
      />
      <CoursesList creatorId={creatorId} />
    </Stack>
  );
};

export default withPrivateRoute(Courses);
