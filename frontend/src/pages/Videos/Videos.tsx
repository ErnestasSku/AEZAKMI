import { Typography } from '@mui/material';
import { VideosList } from './VideosList';
import { withPrivateRoute } from '../../components/PrivateRoute';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Course } from '../../api';

const Videos = () => {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId') ?? undefined;
  const creatorId = searchParams.get('creatorId') ?? undefined;
  const {
    state: { course },
  }: { state: { course: Course } } = useLocation();

  return (
    <>
      <Typography sx={{ padding: '20px' }} variant="h4">
        {courseId
          ? `All videos in ${course.name}`
          : creatorId
          ? `All videos by ${course.creator.username}`
          : 'All videos'}
      </Typography>
      <div>
        <VideosList courseId={courseId} creatorId={creatorId} />
      </div>
    </>
  );
};

export default withPrivateRoute(Videos);
