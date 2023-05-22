import { Typography } from '@mui/material';
import { withPrivateRoute } from '../../components/PrivateRoute';
import { CoursesList } from './CoursesList';

const Courses: React.FC = () => {
  return (
    <>
      <Typography sx={{ padding: '20px' }} variant="h4">
        Courses
      </Typography>
      <div>
        <CoursesList />
      </div>
    </>
  );
};

export default withPrivateRoute(Courses);
