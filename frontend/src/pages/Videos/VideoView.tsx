import { useMutation, useQuery } from 'react-query';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Course,
  Creator,
  VideoPreview,
  fetchUserCourses,
  fetchVideoBlob,
  updateVideoCourse,
} from '../../api';
import React, { useEffect, useRef, useState } from 'react';
import { withPrivateRoute } from '../../components/PrivateRoute';
import {
  Avatar,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { useAuth } from '../../hooks/useAuth';

export const VideoView = withPrivateRoute(() => {
  const { id = '' } = useParams<{ id: string }>();
  const { data: blob } = useQuery(`video-blob-${id}`, () => fetchVideoBlob(id));
  const [videoUrl, setVideoUrl] = useState('');
  const { state }: { state?: { video: VideoPreview } } = useLocation();
  const [video, setVideo] = useState<VideoPreview>(
    state?.video || JSON.parse(localStorage.getItem('video') || '')
  );
  const { mutate } = useMutation((courseId?: string) =>
    updateVideoCourse(video.id, courseId)
  );
  const ref = useRef<HTMLVideoElement>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const updateCourse = (course: Course | null) => {
    setVideo({ ...video, course });
    mutate(course?.id.toString());
    navigate(`/videos/${video.id}`, { state: { video: { ...video, course } } });
  };

  useEffect(() => {
    if (blob?.data) {
      setVideoUrl(URL.createObjectURL(blob.data));
    }
  }, [blob?.data]);

  useEffect(() => {
    if (ref.current) {
      ref.current.play();
    }
  }, [videoUrl]);

  return !videoUrl ? (
    <div>Loading...</div>
  ) : (
    <Stack alignSelf={'center'} alignItems={'center'} padding={'60px'}>
      <video
        controls={true}
        ref={ref}
        src={videoUrl}
        style={{ maxWidth: '1300px', width: '100%' }}
      />
      <Stack
        alignItems={'start'}
        marginTop={'10px'}
        width={'100%'}
        gap={3}
        maxWidth={'1300px'}
      >
        <Stack
          direction={'row'}
          alignItems={'center'}
          width={'100%'}
          justifyContent={'space-between'}
        >
          <Typography variant="h4">{video.title}</Typography>
          <MadeBy creator={video.creator} />
        </Stack>
        <Typography variant="subtitle1" textAlign={'left'}>
          {video.description}
        </Typography>
      </Stack>
      {video.creator.id == user?.id && (
        <CourseInfo
          course={video.course ?? undefined}
          updateVideoCourse={updateCourse}
        />
      )}
    </Stack>
  );
});

const MadeBy = ({ creator }: { creator: Creator }) => {
  return (
    <Stack direction={'row'} alignItems={'center'} gap={2}>
      <Typography variant="h6" fontWeight={'normal'}>
        Made by
      </Typography>
      <Link to={`/courses?creatorId=${creator.id}`}>
        <Card
          sx={{
            padding: '8px 12px',
            borderRadius: '50px',
            bgcolor: grey[300],
            color: grey[800],
            ':hover': {
              cursor: 'pointer',
              boxShadow: '5',
            },
          }}
        >
          <Stack direction={'row'} alignItems={'center'}>
            <Avatar sx={{ bgcolor: blue[500] }}>
              {creator.username[0].toUpperCase()}
            </Avatar>
            <Typography variant="h6" marginLeft={'10px'}>
              {creator.username}
            </Typography>
          </Stack>
        </Card>
      </Link>
    </Stack>
  );
};

const CourseInfo = ({
  course,
  updateVideoCourse,
}: {
  course?: Course;
  updateVideoCourse: (course: Course | null) => void;
}) => {
  const { user } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: userCoursesData } = useQuery(`user-courses-${user!.id}`, () =>
    fetchUserCourses(user!.id)
  );

  const onDialogClose = () => {
    setDialogOpen(false);
  };

  const onClickAssign = () => {
    setDialogOpen(true);
  };

  const onUpdate = (courseId: string) => {
    updateVideoCourse(
      userCoursesData?.data.find(c => c.id.toString() === courseId) || null
    );
  };

  return (
    <Stack
      style={{
        marginTop: '30px',
        width: '100%',
        textAlign: 'left',
        alignItems: 'start',
        maxWidth: '1300px',
      }}
    >
      {user?.role === 'TEACHER' && (
        <Button
          onClick={onClickAssign}
          variant="outlined"
          sx={{ alignSelf: 'center' }}
        >
          {course ? 'Assign to different course' : 'Assign video to a course'}
        </Button>
      )}

      {course && (
        <Paper
          elevation={3}
          sx={{
            marginTop: '10px',
            padding: '20px',
            width: '95%',
            alignSelf: 'center',
          }}
        >
          <Stack>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Typography variant="h6">{course.name}</Typography>
              <Typography variant="body1">
                Videos: {course.videoCount}
              </Typography>
            </Stack>
            <Typography color={grey[600]} variant="body1">
              {course.description}
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Link to={`/videos?courseId=${course.id}`} state={{ course }}>
                Show all videos
              </Link>
            </div>
          </Stack>
        </Paper>
      )}
      <AssignToCourse
        open={dialogOpen}
        onClose={onDialogClose}
        allCourses={userCoursesData?.data || []}
        selectedCourseId={course?.id.toString()}
        onUpdate={onUpdate}
      />
    </Stack>
  );
};

const AssignToCourse = ({
  open,
  allCourses,
  selectedCourseId,
  onUpdate,
  onClose,
}: {
  allCourses: Course[];
  open: boolean;
  selectedCourseId?: string;
  onClose: () => void;
  onUpdate: (courseId: string) => void;
}) => {
  const [currentCourseId, setCurrentCourseId] = useState<string>(
    selectedCourseId || ''
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCourseId(event.target.value);
  };

  const onClickUpdate = () => {
    if (currentCourseId) {
      onUpdate(currentCourseId);
    }
    onClose();
  };

  const onClickClose = () => {
    setCurrentCourseId(selectedCourseId || '');
    onClose();
  };

  const onClickRemove = () => {
    setCurrentCourseId('');
    onUpdate('');
    onClose();
  };

  return (
    <Dialog open={open} scroll="paper" onClose={onClose}>
      <DialogTitle>Assign video to course</DialogTitle>
      <DialogContent>
        <FormControl>
          <RadioGroup value={currentCourseId} onChange={onChange}>
            {allCourses.map(course => (
              <FormControlLabel
                key={course.id}
                value={course.id.toString()}
                control={<Radio />}
                label={course.name}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClickRemove}>Remove course</Button>
        <Button
          color="error"
          style={{ marginLeft: '50px' }}
          onClick={onClickClose}
        >
          Cancel
        </Button>
        <Button color="success" onClick={onClickUpdate}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};
