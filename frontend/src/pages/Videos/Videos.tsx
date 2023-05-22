import { Stack } from '@mui/material';
import { VideosList } from './VideosList';
import { withPrivateRoute } from '../../components/PrivateRoute';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Course } from '../../api';
import { PageHeader } from '../../components/PageHeader';

const Videos = () => {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId') ?? undefined;
  const creatorId = searchParams.get('creatorId') ?? undefined;
  const { state }: { state?: { course?: Course } } = useLocation();
  const course = state?.course;

  return (
    <Stack>
      <PageHeader
        showHeader={!!courseId}
        headerTitle={course?.name}
        headerSubtitle={course?.description}
        title={`Videos${
          creatorId ? ` by user "${course?.creator.username}"` : ''
        }`}
      />
      <VideosList courseId={courseId} creatorId={creatorId} />
    </Stack>
  );
};

export default withPrivateRoute(Videos);
