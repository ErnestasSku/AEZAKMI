import { Container } from '@mui/material';
import { Video } from '../../api';
import { Link } from 'react-router-dom';

interface Props {
  video: Video;
}

export const VideoPreview = ({ video }: Props) => {
  return (
    <Link to="/">
      <Container>
        <img
          width="100%"
          src="https://static-cse.canva.com/blob/1053959/1600w-wK95f3XNRaM.jpg"
        />
        <p>{video.title}</p>
      </Container>
    </Link>
  );
};
