import { Button, Stack } from '@mui/material';
import { withPrivateRoute } from '../../components/PrivateRoute';
import { CoursesList } from './CoursesList';
import { PageHeader } from '../../components/PageHeader';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { Creator } from '../../api';

const Courses: React.FC = () => {
  const [searchParams] = useSearchParams();
  const client = useQueryClient();
  const creatorId = searchParams.get('creatorId') ?? undefined;
  const creator = client.getQueryData<Creator>(['creators', creatorId]);
  const navigate = useNavigate();

  const onCreatorVideosClick = () => {
    navigate(`/videos?creatorId=${creatorId}`, { state: { creator } });
  };

  return (
    <Stack>
      <PageHeader
        title={`Courses${creator ? ` by user "${creator.username}"` : ''}`}
      />
      {creator && (
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

export default withPrivateRoute(Courses);
