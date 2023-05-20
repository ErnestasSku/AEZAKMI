import { Typography } from '@mui/material';
import { VideosList } from './VideosList';
import { withPrivateRoute } from '../../components/PrivateRoute';
import { useSearchParams } from 'react-router-dom';

const Videos = () => {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId') ?? undefined;
  const creatorId = searchParams.get('creatorId') ?? undefined;

  return (
    <>
      <Typography sx={{ padding: '20px' }} variant="h4">
        {courseId
          ? `All videos in Course ${courseId}`
          : creatorId
          ? `All videos by Creator ${creatorId}`
          : 'All videos'}
      </Typography>
      <div>
        <VideosList courseId={courseId} creatorId={creatorId} />
      </div>
    </>
  );
};

export default withPrivateRoute(Videos);
