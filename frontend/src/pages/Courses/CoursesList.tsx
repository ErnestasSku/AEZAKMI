import { useQuery } from 'react-query';
import { fetchAllCourses } from '../../api';
import { CoursePreview } from './CoursePreview';
import React, { useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { CircularProgress, Stack, TextField, Typography } from '@mui/material';

export const CoursesList = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const { data, isLoading } = useQuery(['courses', debouncedSearch], () =>
    fetchAllCourses(debouncedSearch)
  );

  return (
    <Stack alignItems={'center'} sx={{ paddingX: '40px' }}>
      <TextField
        fullWidth
        sx={{ marginY: '20px', maxWidth: '500px' }}
        value={search}
        label="Search courses"
        placeholder='e.g. "Introduction to Programming in Java"'
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(event.target.value)
        }
      />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Stack gap={2} width={'100%'}>
          <Typography textAlign={'left'} variant="h5">
            {getResultsString(debouncedSearch, data?.data.length)}
          </Typography>
          <Stack gap={4}>
            {data?.data.length === 0 && (
              <Typography variant="h5">No results :/</Typography>
            )}
            {data?.data.map(course => (
              <CoursePreview key={course.id} course={course} />
            ))}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

const getResultsString = (search?: string, size?: number) => {
  if (search) {
    return `"${search}" courses (${size}):`;
  }

  return `All courses (${size}):`;
};
