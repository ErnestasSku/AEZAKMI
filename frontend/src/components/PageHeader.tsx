import { Typography } from '@mui/material';
import { Course } from '../api';
import { CourseInfo } from './CourseInfo';

interface Props {
  course?: Course;
  title: string;
}

export const PageHeader = ({ course, title }: Props) => {
  return course ? (
    <CourseInfo course={course} />
  ) : (
    <Typography sx={{ padding: '20px' }} variant="h4">
      {title}
    </Typography>
  );
};
