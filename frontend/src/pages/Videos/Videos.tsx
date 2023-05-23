import { Stack } from '@mui/material';
import { VideosList } from './VideosList';
import { withPrivateRoute } from '../../components/PrivateRoute';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Course, Creator } from '../../api';
import { PageHeader } from '../../components/PageHeader';

const Videos = () => {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId') ?? undefined;
  const creatorId = searchParams.get('creatorId') ?? undefined;
  const { state }: { state?: { course?: Course; creator?: Creator } } =
    useLocation();
  const course = state?.course;

  return (
    <Stack>
      <PageHeader
        course={course}
        title={`Videos${
          creatorId
            ? ` by user "${
                course?.creator.username || state?.creator?.username
              }"`
            : ''
        }`}
      />
      <VideosList courseId={courseId} creatorId={creatorId} />
    </Stack>
  );
};

export default withPrivateRoute(Videos);
