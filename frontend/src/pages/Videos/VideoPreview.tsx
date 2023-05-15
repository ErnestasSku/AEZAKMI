import { Container } from '@mui/material';
import { VideoPreview } from '../../api';
import { Link } from 'react-router-dom';

interface Props {
  video: VideoPreview;
}

export const VideoPreviewView = ({ video }: Props) => {
  return (
    <Link to={`${video.id}`} state={{ video }}>
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
  );
};
