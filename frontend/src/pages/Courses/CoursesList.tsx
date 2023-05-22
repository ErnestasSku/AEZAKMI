import { useQuery } from 'react-query';
import { Course, fetchAllCourses } from '../../api';
import { CoursePreview } from './CoursePreview';
import { useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { SearchList } from '../../components/SearchList';

interface Props {
  creatorId?: string;
}

export const CoursesList = ({ creatorId }: Props) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const { data, isLoading } = useQuery(
    ['courses', creatorId, debouncedSearch],
    () => fetchAllCourses(creatorId, debouncedSearch)
  );

  const renderCoursePreview = (course: Course) => (
    <CoursePreview key={course.id} course={course} />
  );

  return (
    <SearchList
      isLoading={isLoading}
      data={data?.data}
      renderDataItem={renderCoursePreview}
      setSearch={setSearch}
      search={search}
      debouncedSearch={debouncedSearch}
      searchProps={{
        label: 'Search courses',
        placeholder: 'e.g. "Introduction to Programming in Java"',
      }}
      getResultsString={getResultsString}
    />
  );
};

const getResultsString = (search?: string, size?: number) => {
  if (search) {
    return `"${search}" courses (${size}):`;
  }
  return `All courses (${size}):`;
};
