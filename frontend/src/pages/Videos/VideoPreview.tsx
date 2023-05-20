import { Container, Paper } from '@mui/material';
import { VideoPreview } from '../../api';
import { Link } from 'react-router-dom';

interface Props {
  video: VideoPreview;
}

export const VideoPreviewView = ({ video }: Props) => {
  return (
    <Paper
      sx={{ padding: '10px', margin: '0px 10px', ':hover': { boxShadow: 10 } }}
      elevation={4}
    >
      <Link to={video.id} state={{ video }} style={{ color: 'inherit' }}>
        <Container>
          <img
            width="100%"
            height="200vh"
            style={{ objectFit: 'cover' }}
            src={video.imageUrl}
          />
          <p>{video.title}</p>
        </Container>
      </Link>
    </Paper>
  );
};
