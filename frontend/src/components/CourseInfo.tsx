import { Paper, Stack, Typography } from '@mui/material';
import { Course } from '../api';
import { blueGrey } from '@mui/material/colors';
import { Link } from 'react-router-dom';

interface Props {
  course: Course;
  showVideosCount?: boolean;
  showViewAll?: boolean;
}

export const CourseInfo = ({
  course,
  showVideosCount = false,
  showViewAll = false,
}: Props) => {
  return (
    <Paper
      elevation={3}
      sx={{ textAlign: 'left', margin: '30px', bgcolor: blueGrey[100] }}
    >
      <Stack>
        <Stack>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography sx={{ padding: '20px' }} variant="h4">
              {course.name}
            </Typography>
            {showVideosCount && (
              <Typography sx={{ padding: '20px' }} variant="h6">
                {course.videoCount} videos
              </Typography>
            )}
          </Stack>
          <Typography sx={{ padding: '20px' }} variant="body1">
            {course.description}
          </Typography>
        </Stack>
        {showViewAll && (
          <div
            style={{
              display: 'flex',
              padding: '4px 0 12px 0',
              justifyContent: 'center',
            }}
          >
            <Link to={`/videos?courseId=${course.id}`} state={{ course }}>
              Show all videos
            </Link>
          </div>
        )}
      </Stack>
    </Paper>
  );
};
