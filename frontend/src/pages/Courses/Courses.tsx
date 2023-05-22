import { withPrivateRoute } from '../../components/PrivateRoute';
import { CoursesList } from './CoursesList';

const Courses: React.FC = () => {
  return (
    <>
      {/* <Typography variant="h4">All courses</Typography> */}
      <div>
        <CoursesList />
      </div>
    </>
  );
};

export default withPrivateRoute(Courses);
