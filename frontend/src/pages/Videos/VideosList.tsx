import { VideoPreviewView } from './VideoPreview';
import { VideoPreview, fetchAllVideoPreviews } from '../../api';
import { useQuery } from 'react-query';
import { convertArrayToChunks } from '../../utils/array';
import { Grid } from '@mui/material';
import { useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { SearchList } from '../../components/SearchList';

interface Props {
  courseId?: string;
  creatorId?: string;
}

export const VideosList = ({ courseId, creatorId }: Props) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const { data, isLoading } = useQuery(
    ['videos', courseId, creatorId, debouncedSearch],
    () =>
      fetchAllVideoPreviews({
        courseId,
        creatorId,
        search: debouncedSearch,
      })
  );

  const renderVideoPreviewGrid = (chunk: VideoPreview[], index: number) => (
    <Grid container key={index} wrap="nowrap" spacing={6}>
      {chunk.map(video => (
        <Grid key={video.id} item xs={4}>
          <VideoPreviewView video={video} />
        </Grid>
      ))}
    </Grid>
  );

  const chunks: VideoPreview[][] = convertArrayToChunks(data?.data, 3);

  return (
    <SearchList
      data={chunks}
      isLoading={isLoading}
      renderDataItem={renderVideoPreviewGrid}
      setSearch={setSearch}
      search={search}
      debouncedSearch={debouncedSearch}
      searchProps={{
        label: courseId
          ? 'Search videos in course'
          : creatorId
          ? 'Search videos by user'
          : 'Search all videos',
        placeholder: 'e.g. "How to create a variable in Java?"',
      }}
      getResultsString={getResultsString}
    />
  );
};

const getResultsString = (search?: string, size?: number) => {
  if (search) {
    return `"${search}" videos (${size}):`;
  }
  return `All videos (${size}):`;
};
