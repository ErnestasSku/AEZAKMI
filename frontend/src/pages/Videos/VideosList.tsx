import { VideoPreviewView } from './VideoPreview';
import { fetchAllVideoPreviews } from '../../api';
import { useQuery } from 'react-query';
import { convertArrayToChunks } from '../../utils/array';

export const VideosList = ({}) => {
  const { data, isLoading } = useQuery('videos', fetchAllVideoPreviews);

  const chunks = convertArrayToChunks(data?.data, 3);

  return isLoading ? (
    <>
      <div>Loading...</div>
    </>
  ) : (
    <>
      {chunks.map(chunk => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px 40px',
          }}
        >
          {chunk.map(video => (
            // TODO: Fix small space at the end of the row
            <div key={video.id} style={{ width: '33%' }}>
              <VideoPreviewView video={video} />
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
