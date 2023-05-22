import { useQuery } from 'react-query';
import { fetchAllCourses } from '../../api';
import { CoursePreview } from './CoursePreview';

export const CoursesList = () => {
  const { data, isLoading } = useQuery('courses', fetchAllCourses);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : data?.data.length ? (
        data.data.map(course => (
          <CoursePreview key={course.id} course={course} />
        ))
      ) : (
        <div>No courses</div>
      )}
    </div>
  );
};
