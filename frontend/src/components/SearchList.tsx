import { CircularProgress, Stack, TextField, Typography } from '@mui/material';
import React from 'react';

export interface SearchListProps<T> {
  search?: string;
  debouncedSearch?: string;
  isLoading: boolean;
  data?: T[];
  searchProps: {
    placeholder: string;
    label: string;
  };
  renderDataItem: (item: T, index: number) => JSX.Element;
  setSearch: (search: string) => void;
  getResultsString: (search?: string, size?: number) => string;
}

const SearchListNonMemo = <T,>({
  search,
  debouncedSearch,
  isLoading,
  data,
  renderDataItem,
  getResultsString,
  setSearch,
  searchProps,
}: SearchListProps<T>) => {
  return (
    <Stack alignItems={'center'} sx={{ paddingX: '40px' }}>
      <TextField
        fullWidth
        sx={{ marginY: '20px', maxWidth: '500px' }}
        value={search}
        {...searchProps}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(event.target.value)
        }
      />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Stack gap={2} width={'100%'}>
          <Typography textAlign={'left'} variant="h5">
            {getResultsString(debouncedSearch, data?.flatMap(x => x).length)}
          </Typography>
          <Stack gap={4}>
            {data?.length === 0 && (
              <Typography variant="h5">No results :/</Typography>
            )}
            {data?.map(renderDataItem)}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

const SearchList = React.memo(SearchListNonMemo) as typeof SearchListNonMemo;
export { SearchList };
