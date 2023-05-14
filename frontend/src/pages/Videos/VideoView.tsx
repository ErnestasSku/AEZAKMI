import { useQuery } from 'react-query';
import { useLocation, useParams } from 'react-router-dom';
import { VideoPreview, fetchVideoBlob } from '../../api';
import { useCallback, useEffect, useRef, useState } from 'react';
import { withPrivateRoute } from '../../components/PrivateRoute';

export const VideoView = withPrivateRoute(() => {
  const { id = '' } = useParams<{ id: string }>();
  const { data: blob, isLoading } = useQuery(`video-blob-${id}`, () =>
    fetchVideoBlob(id)
  );
  const [videoUrl, setVideoUrl] = useState('');
  const {
    state: { video },
  }: { state: { video: VideoPreview } } = useLocation();
  const ref = useRef<HTMLVideoElement>();

  const callbackRef = useCallback((node: HTMLVideoElement) => {
    if (node !== null) {
      node.play();
      ref.current = node;
    }
  }, []);

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

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div style={{ marginTop: '24px' }}>
      <video controls={true} ref={callbackRef} width={1000} src={videoUrl} />
      <h3>Title: {video.title}</h3>
      <h4>Description:</h4>
      <p>{video.description}</p>
    </div>
  );
});
