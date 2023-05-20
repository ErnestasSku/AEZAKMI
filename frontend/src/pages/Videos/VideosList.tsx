import { VideoPreviewView } from './VideoPreview';
import { VideoPreview, fetchAllVideoPreviews } from '../../api';
import { useQuery } from 'react-query';
import { convertArrayToChunks } from '../../utils/array';

interface Props {
  courseId?: string;
  creatorId?: string;
}

export const VideosList = ({ courseId, creatorId }: Props) => {
  const { data, isLoading } = useQuery(
    `videos-${JSON.stringify({ courseId, creatorId })}`,
    () =>
      fetchAllVideoPreviews({
        courseId,
        creatorId,
      })
  );

  const chunks: VideoPreview[][] = convertArrayToChunks(data?.data, 3);

  return isLoading ? (
    <>
      <div>Loading...</div>
    </>
  ) : !chunks[0]?.length ? (
    <div>
      {courseId
        ? 'No videos added to course yet :('
        : creatorId
        ? 'No videos added by creator yet :('
        : 'No videos added yet :('}{' '}
    </div>
  ) : (
    <>
      {chunks.map((chunk, index) => (
        <div
          key={index}
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
