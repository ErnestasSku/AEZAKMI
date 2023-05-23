import { Typography } from '@mui/material';
import { Course } from '../api';
import { CourseInfo } from './CourseInfo';

interface Props {
  showVideosCount?: boolean;
  showViewAll?: boolean;
  course?: Course;
  title?: string;
}

export const PageHeader = ({
  course,
  title,
  showVideosCount,
  showViewAll,
}: Props) => {
  return course ? (
    <CourseInfo
      showVideosCount={showVideosCount}
      showViewAll={showViewAll}
      course={course}
    />
  ) : (
    <Typography sx={{ padding: '20px' }} variant="h4">
      {title}
    </Typography>
  );
};
