import { Stack } from '@mui/material';
import { VideosList } from './VideosList';
import { withPrivateRoute } from '../../components/PrivateRoute';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Course, Creator, LoggedInUser } from '../../api';
import { PageHeader } from '../../components/PageHeader';
import { useAuth } from '../../hooks/useAuth';

const Videos = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const courseId = searchParams.get('courseId') ?? undefined;
  const creatorId = searchParams.get('creatorId') ?? undefined;
  const { state }: { state?: { course?: Course; creator?: Creator } } =
    useLocation();
  const course = state?.course;

  return (
    <Stack>
      <PageHeader
        course={course}
        title={getTitle(user, creatorId, course?.creator || state?.creator)}
      />
      <VideosList courseId={courseId} creatorId={creatorId} />
    </Stack>
  );
};

export const getTitle = (
  user: LoggedInUser | null,
  creatorId?: string,
  creator?: Creator
) => {
  if (user?.id.toString() === creatorId) {
    return 'My Videos';
  }
  return `Videos${creator?.id ? ` by user "${creator?.username}"` : ''}`;
};

export default withPrivateRoute(Videos);
