import {
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Stack,
  TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useAuth } from '../../hooks/useAuth';
import { createCourse, fetchAllVideoPreviews } from '../../api';
import { Add, Launch } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { withPrivateRoute } from '../../components/PrivateRoute';

interface FormData {
  name: string;
  description: string;
  videoIds?: string[];
}

const CreateCourse = withPrivateRoute(() => {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: '',
      description: '',
      videoIds: [],
    },
  });
  const { user } = useAuth();
  const { data: userVideosData, isLoading: isLoadingUserVideos } = useQuery(
    ['user-videos', user!.id],
    () => fetchAllVideoPreviews({ creatorId: user!.id.toString() })
  );
  const { mutate, isSuccess } = useMutation((data: FormData) =>
    createCourse(data)
  );

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  useEffect(() => {
    if (isSuccess) {
      alert('Course created successfully!');
    }
  }, [isSuccess]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} style={{ marginTop: '20px', width: '80vw' }}>
          <Controller
            control={control}
            name="name"
            rules={{ required: 'Course name is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                fullWidth
                error={!!error}
                autoComplete="name"
                variant="outlined"
                label="Course name"
                placeholder='e.g. "Introduction to Programming I"'
                type="text"
                autoFocus
                helperText={
                  error ? error.message : 'Set a name for your course'
                }
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            rules={{ required: 'Description is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                fullWidth
                error={!!error}
                multiline
                autoComplete="description"
                variant="outlined"
                label="Course description"
                placeholder='e.g. "This course is about programming in Java basics. Here you will learn everything you need to code your first calculator!"'
                type="text"
                rows={3}
                inputProps={{ maxLength: 255 }}
                helperText={
                  error
                    ? error.message
                    : 'Set a description for your course about its contents.'
                }
              />
            )}
          />
          {isLoadingUserVideos || !!userVideosData?.data.length ? (
            <Controller
              control={control}
              name="videoIds"
              render={({ field: { onChange, value } }) =>
                isLoadingUserVideos ? (
                  <div>Loading videos...</div>
                ) : (
                  <>
                    <FormControl>
                      <Paper
                        elevation={4}
                        style={{
                          maxHeight: '400px',
                          overflowY: 'scroll',
                          marginTop: '0px',
                        }}
                      >
                        <List>
                          {userVideosData?.data.map(video => (
                            <ListItem
                              key={video.id}
                              disablePadding
                              secondaryAction={
                                <Link
                                  target="_blank"
                                  to={`/videos/${video.id}`}
                                >
                                  <IconButton
                                    style={{
                                      borderRadius: '2px',
                                      paddingRight: '20px',
                                    }}
                                    size="small"
                                  >
                                    <Stack
                                      direction="row"
                                      alignItems="center"
                                      spacing={1}
                                    >
                                      <Launch />
                                      <div>Go to video</div>
                                    </Stack>
                                  </IconButton>
                                </Link>
                              }
                            >
                              <ListItemButton
                                style={{ padding: '16px' }}
                                onClick={() => {
                                  onChange(
                                    value?.includes(video.id)
                                      ? value?.filter(id => id !== video.id)
                                      : [...(value ?? []), video.id]
                                  );
                                }}
                              >
                                <Checkbox checked={value?.includes(video.id)} />
                                <div>{video.title}</div>
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </Paper>
                    </FormControl>

                    <FormHelperText
                      style={{ marginTop: '6px', marginLeft: '12px' }}
                    >
                      Select videos to include in your course
                    </FormHelperText>
                  </>
                )
              }
            />
          ) : null}
          <Button
            type="submit"
            variant="contained"
            startIcon={<Add />}
            size="large"
            style={{
              alignSelf: 'center',
              width: '16vw',
              fontSize: '1.2em',
              textTransform: 'none',
            }}
          >
            Create
          </Button>
        </Stack>
      </form>
    </div>
  );
});

export default CreateCourse;
