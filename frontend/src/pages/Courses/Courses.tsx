import { Button, Stack } from '@mui/material';
import { withPrivateRoute } from '../../components/PrivateRoute';
import { CoursesList } from './CoursesList';
import { PageHeader } from '../../components/PageHeader';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { Creator, LoggedInUser } from '../../api';
import { useAuth } from '../../hooks/useAuth';

const Courses: React.FC = () => {
  const [searchParams] = useSearchParams();
  const client = useQueryClient();
  const creatorId = searchParams.get('creatorId') ?? undefined;
  const creator = client.getQueryData<Creator>(['creators', creatorId]);
  const navigate = useNavigate();
  const { user } = useAuth();

  const onCreatorVideosClick = () => {
    navigate(`/videos?creatorId=${creatorId}`, { state: { creator } });
  };

  return (
    <Stack>
      <PageHeader title={getTitle(user, creatorId)} />
      {creator && user?.id !== creator.id && (
        <Button
          onClick={onCreatorVideosClick}
          sx={{ alignSelf: 'center' }}
          variant="contained"
        >
          Go to "{creator?.username}" videos
        </Button>
      )}
      <CoursesList creatorId={creatorId} />
    </Stack>
  );
};

const getTitle = (user: LoggedInUser | null, creatorId?: string) => {
  if (user?.id.toString() === creatorId) {
    return 'My Courses';
  }
  return `Courses${creatorId ? ` by user "${user?.username}"` : ''}`;
};

export default withPrivateRoute(Courses);
