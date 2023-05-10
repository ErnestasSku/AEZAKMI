import { Typography } from '@mui/material';
import { VideosList } from './VideosList';

const Videos = () => {
  return (
    <>
      <Typography variant="h4">All videos</Typography>
      <div>
        <VideosList />
      </div>
    </>
  );
};

export default Videos;
