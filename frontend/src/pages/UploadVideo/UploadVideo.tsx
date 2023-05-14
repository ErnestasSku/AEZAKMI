import { withPrivateRoute } from '../../components/PrivateRoute';
import { UploadVideoForm } from './UploadVideoForm';

export const UploadVideo = withPrivateRoute(() => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {/* <Typography variant="h4">Upload video</Typography> */}
      <UploadVideoForm />
    </div>
  );
});
