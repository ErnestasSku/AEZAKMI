import { useQuery } from 'react-query';
import { useLocation, useParams } from 'react-router-dom';
import { VideoPreview, fetchVideoBlob } from '../../api';
import { useEffect, useRef, useState } from 'react';
import { withPrivateRoute } from '../../components/PrivateRoute';

export const VideoView = withPrivateRoute(() => {
  const { id = '' } = useParams<{ id: string }>();
  const { data: blob } = useQuery(`video-blob-${id}`, () => fetchVideoBlob(id));
  const [videoUrl, setVideoUrl] = useState('');
  const { state }: { state?: { video: VideoPreview } } = useLocation();
  const video = state?.video || JSON.parse(localStorage.getItem('video') || '');

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
    <div style={{ marginTop: '24px' }}>
      <video controls={true} ref={ref} width={1000} src={videoUrl} />
      <h3>Title: {video.title}</h3>
      <h4>Description:</h4>
      <p>{video.description}</p>
    </div>
  );
});
