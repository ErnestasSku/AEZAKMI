import { Typography } from '@mui/material';
import { VideosList } from './VideosList';
import { withPrivateRoute } from '../../components/PrivateRoute';

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

export default withPrivateRoute(Videos);
