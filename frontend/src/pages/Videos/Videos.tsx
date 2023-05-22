import { Paper, Stack, Typography } from '@mui/material';
import { VideosList } from './VideosList';
import { withPrivateRoute } from '../../components/PrivateRoute';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Course } from '../../api';
import { blueGrey } from '@mui/material/colors';

const Videos = () => {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId') ?? undefined;
  const creatorId = searchParams.get('creatorId') ?? undefined;
  const { state }: { state?: { course?: Course } } = useLocation();
  const course = state?.course;

  return (
    <Stack sx={{}}>
      {courseId ? (
        <Paper
          elevation={3}
          sx={{ textAlign: 'left', margin: '30px', bgcolor: blueGrey[100] }}
        >
          <Typography sx={{ padding: '20px' }} variant="h4">
            {course?.name}
          </Typography>
          <Typography sx={{ padding: '20px' }} variant="body1">
            {course?.description}
          </Typography>
        </Paper>
      ) : (
        <Typography sx={{ padding: '20px' }} variant="h4">
          Videos{creatorId && ` by user "${course?.creator.username}"`}
        </Typography>
      )}
      <VideosList courseId={courseId} creatorId={creatorId} />
    </Stack>
  );
};

export default withPrivateRoute(Videos);
