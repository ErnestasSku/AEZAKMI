import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchVideo } from '../../api';
import { useCallback } from 'react';
import { withPrivateRoute } from '../../components/PrivateRoute';

export const VideoView = withPrivateRoute(() => {
  const { id = '' } = useParams<{ id: string }>();
  const { data, isLoading } = useQuery('video', () => fetchVideo(id));

  const callbackRef = useCallback((node: HTMLVideoElement) => {
    if (node !== null) {
      node.play();
    }
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div style={{ marginTop: '24px' }}>
      <video
        controls={true}
        ref={callbackRef}
        width={1000}
        src={`data:video/mp4;base64,${data?.data.data}`}
      />
      <h3>Title: {data?.data.title}</h3>
      <h4>Description:</h4>
      <p>{data?.data.description}</p>
    </div>
  );
});
