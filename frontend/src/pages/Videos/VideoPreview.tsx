import { Container, Paper, Stack, Typography } from '@mui/material';
import { VideoPreview } from '../../api';
import { Link } from 'react-router-dom';
import { grey } from '@mui/material/colors';

interface Props {
  video: VideoPreview;
}

export const VideoPreviewView = ({ video }: Props) => {
  return (
    <Paper sx={{ padding: '10px', ':hover': { boxShadow: 10 } }} elevation={4}>
      <Link to={video.id.toString()} style={{ color: 'inherit' }}>
        <Container>
          <img
            width="100%"
            height="200vh"
            style={{ objectFit: 'cover' }}
            src={video.imageUrl}
          />
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            gap={2}
          >
            <Stack
              minHeight={'50px'}
              alignItems={'start'}
              justifyContent={'center'}
            >
              <Typography
                fontFamily={'Roboto'}
                textAlign={'left'}
                fontSize={'1.05rem'}
                textTransform={'uppercase'}
              >
                {video.title}
              </Typography>
              {video.course && (
                <Typography
                  textAlign={'left'}
                  color={grey[500]}
                  variant="body1"
                >
                  {video.course.name}
                </Typography>
              )}
            </Stack>
            <Typography variant="body1">{video.creator.username}</Typography>
          </Stack>
        </Container>
      </Link>
    </Paper>
  );
};
