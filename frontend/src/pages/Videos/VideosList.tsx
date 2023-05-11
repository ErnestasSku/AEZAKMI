import { List, ListItem } from '@mui/material';
import { VideoPreview } from './VideoPreview';
import { fetchAllVideoPreviews } from '../../api';
import { useQuery } from 'react-query';
import { convertArrayToChunks } from '../../utils/array';

export const VideosList = ({}) => {
  const { data, isLoading } = useQuery('videos', fetchAllVideoPreviews);

  const chunks = convertArrayToChunks(data?.data, 3);

  return (
    <List>
      {isLoading ? (
        <>
          <div>Loading...</div>
        </>
      ) : (
        <>
          {chunks.map((chunk, index) => (
            <ListItem key={index}>
              {chunk.map(video => (
                // Fix small space at the end of the row
                <div style={{ width: '33%' }}>
                  <VideoPreview key={video.id} video={video} />
                </div>
              ))}
            </ListItem>
          ))}
        </>
      )}
    </List>
  );
};
