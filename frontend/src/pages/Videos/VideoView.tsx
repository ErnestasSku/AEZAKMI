import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Course,
  Creator,
  LoggedInUser,
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
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { useAuth } from '../../hooks/useAuth';
import { PageHeader } from '../../components/PageHeader';

export const VideoView = withPrivateRoute(() => {
  const { user } = useAuth();
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
    <Stack sx={{ marginX: 'auto', padding: '60px' }} maxWidth={'1300px'}>
      {video.course && (
        <PageHeader showVideosCount showViewAll course={video.course} />
      )}
      <Stack width={'100%'} alignSelf={'center'} alignItems={'center'}>
        <video
          controls={true}
          ref={ref}
          src={videoUrl}
          style={{ width: '100%' }}
        />
        <Stack alignItems={'start'} marginTop={'10px'} width={'100%'} gap={3}>
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

        {user?.role === 'TEACHER' && user.id === video.creator.id ? (
          <AssignToCourse
            user={user}
            course={video.course ?? undefined}
            updateVideoCourse={updateCourse}
          />
        ) : null}
      </Stack>
    </Stack>
  );
});

const MadeBy = ({ creator }: { creator: Creator }) => {
  const client = useQueryClient();

  const onClickCreator = () => {
    client.setQueryData(['creators', creator.id.toString()], creator);
  };

  return (
    <Stack direction={'row'} alignItems={'center'} gap={2}>
      <Typography variant="h6" fontWeight={'normal'}>
        Made by
      </Typography>
      <Link onClick={onClickCreator} to={`/courses?creatorId=${creator.id}`}>
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

const AssignToCourse = ({
  user,
  course,
  updateVideoCourse,
}: {
  user: LoggedInUser;
  course?: Course;
  updateVideoCourse: (course: Course | null) => void;
}) => {
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
      <Button
        onClick={onClickAssign}
        variant="outlined"
        sx={{ alignSelf: 'center' }}
      >
        {course ? 'Assign to different course' : 'Assign video to a course'}
      </Button>

      <AssignToCourseDialog
        open={dialogOpen}
        onClose={onDialogClose}
        allCourses={userCoursesData?.data || []}
        selectedCourseId={course?.id.toString()}
        onUpdate={onUpdate}
      />
    </Stack>
  );
};

const AssignToCourseDialog = ({
  open,
  onClose,
  allCourses,
  selectedCourseId,
  onUpdate,
}: {
  open: boolean;
  onClose: () => void;
  allCourses: Course[];
  selectedCourseId?: string;
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

  const onClickCancel = () => {
    setCurrentCourseId(selectedCourseId || '');
    onClose();
  };

  const onClickRemove = () => {
    setCurrentCourseId('');
    onUpdate('');
    onClose();
  };

  return (
    <Dialog open={open} scroll="paper" onClose={onClickCancel}>
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
          onClick={onClickCancel}
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
