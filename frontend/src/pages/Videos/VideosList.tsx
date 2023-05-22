import { VideoPreviewView } from './VideoPreview';
import { VideoPreview, fetchAllVideoPreviews } from '../../api';
import { useQuery } from 'react-query';
import { convertArrayToChunks } from '../../utils/array';
import { Grid } from '@mui/material';

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
    <Grid container rowGap={6} padding={'20px 40px'}>
      {chunks.map((chunk, index) => (
        <Grid container key={index} wrap="nowrap" spacing={6}>
          {chunk.map(video => (
            <Grid key={video.id} item xs={4}>
              <VideoPreviewView video={video} />
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};
