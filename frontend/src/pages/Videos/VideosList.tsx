import { List, ListItem } from '@mui/material';
import { VideoPreview } from './VideoPreview';
import { fetchAllVideos } from '../../api';
import { useQuery } from 'react-query';
import { convertArrayToChunks } from '../../utils/array';

export const VideosList = ({}) => {
  const { data, isLoading } = useQuery('videos', fetchAllVideos);

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
            <ListItem key={index} style={{ justifyContent: 'space-around' }}>
              {chunk.map(video => (
                <VideoPreview key={video.id} video={video} />
              ))}
            </ListItem>
          ))}
        </>
      )}
    </List>
  );
};
