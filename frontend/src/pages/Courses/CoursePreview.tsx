import { Box, Paper, Stack, Typography } from '@mui/material';
import { Course } from '../../api';
import { Link, useNavigate } from 'react-router-dom';
import { MouseEvent } from 'react';

interface Props {
  course: Course;
}

export const CoursePreview = ({ course }: Props) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/videos?courseId=${course.id}`, { state: { course } });
  };

  const onClickCreator = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div onClick={onClick}>
      <Paper
        elevation={3}
        style={{
          display: 'flex',
          flexDirection: 'row',
          margin: '30px 40px',
          border: '1px solid black',
          minHeight: '150px',
        }}
        sx={{
          ':hover': {
            boxShadow: '10',
            cursor: 'pointer',
          },
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
            borderRight: '1px solid black',
          }}
        >
          <Typography
            variant="h4"
            style={{
              borderBottom: '1px solid black',
              padding: '20px',
            }}
          >
            {course.name}
          </Typography>
          <div
            style={{
              display: 'flex',
              padding: '16px',
              justifyContent: 'space-around',
              alignItems: 'center',
              fontSize: '1.2rem',
              height: '100%',
            }}
          >
            <div>{course.videoCount} videos</div>

            <Stack direction="row" gap={1}>
              by
              <Link
                onClick={onClickCreator}
                to={`/videos?creatorId=${course.creator.id}`}
                state={{ course }}
              >
                <Box
                  sx={{
                    ':hover': {
                      textDecoration: 'underline',
                    },
                    display: 'inline',
                  }}
                >
                  {course.creator.username}
                </Box>
              </Link>
            </Stack>
          </div>
        </div>
        <div
          style={{
            width: '50%',
            display: 'flex',
          }}
        >
          <p style={{ padding: '20px', margin: 0, textAlign: 'left' }}>
            {course.description}
          </p>
        </div>
      </Paper>
    </div>
  );
};
