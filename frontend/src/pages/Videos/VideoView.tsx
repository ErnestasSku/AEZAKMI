import { useQuery } from 'react-query';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Creator, VideoPreview, fetchVideoBlob } from '../../api';
import { useEffect, useRef, useState } from 'react';
import { withPrivateRoute } from '../../components/PrivateRoute';
import { Avatar, Card, Stack, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';

export const VideoView = withPrivateRoute(() => {
  const { id = '' } = useParams<{ id: string }>();
  const { data: blob } = useQuery(`video-blob-${id}`, () => fetchVideoBlob(id));
  const [videoUrl, setVideoUrl] = useState('');
  const { state }: { state?: { video: VideoPreview } } = useLocation();
  const video: VideoPreview =
    state?.video || JSON.parse(localStorage.getItem('video') || '');

  const ref = useRef<HTMLVideoElement>(null);

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
        style={{ maxWidth: '1300px' }}
      />
      <Stack
        alignItems={'start'}
        // alignSelf={'start'}
        marginTop={'10px'}
        width={'100%'}
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
        <Typography variant="subtitle1">{video.description}</Typography>
      </Stack>
    </Stack>
  );
});

export const MadeBy = ({ creator }: { creator: Creator }) => {
  return (
    <Stack direction={'row'} alignItems={'center'} gap={2}>
      <Typography variant="h6">Made by</Typography>
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
