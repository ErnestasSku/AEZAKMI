import { List, ListItem } from '@mui/material';
import { VideoPreviewView } from './VideoPreview';
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
                // TODO: Fix small space at the end of the row
                <div key={video.id} style={{ width: '33%' }}>
                  <VideoPreviewView video={video} />
                </div>
              ))}
            </ListItem>
          ))}
        </>
      )}
    </List>
  );
};
