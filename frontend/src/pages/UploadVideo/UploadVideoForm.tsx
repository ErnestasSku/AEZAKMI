import { DragDropFiles } from './DragDropFiles';
import { Controller, useForm } from 'react-hook-form';
import { Button, Stack, TextField } from '@mui/material';
import { Upload } from '@mui/icons-material';
import { uploadVideo } from '../../api';
import { useNavigate } from 'react-router-dom';

interface FormData {
  title: string;
  description: string;
  video: File | null;
}

export const UploadVideoForm = () => {
  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      title: '',
      description: '',
      video: null,
    },
  });
  const navigate = useNavigate();

  const submitForm = async (data: FormData) => {
    const { status } = await uploadVideo({
      title: data.title,
      description: data.description,
      data: data.video!,
    });
    if (status === 200) {
      alert('Video uploaded successfully!');
      navigate('/videos');
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Stack
        spacing={3}
        alignItems="center"
        style={{ marginTop: '20px', width: '80vw' }}
      >
        <Controller
          control={control}
          name="video"
          rules={{ required: 'Video file is required' }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <DragDropFiles
              file={value}
              setFile={onChange}
              error={error?.message}
            />
          )}
        />
        <Controller
          name="title"
          control={control}
          rules={{
            required: 'Title is required',
            minLength: {
              value: 3,
              message: 'Title has to be at least 3 characters long',
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              error={!!error}
              autoComplete="title"
              variant="outlined"
              label="Video title"
              placeholder='e.g. "My first video"'
              type="text"
              autoFocus
              helperText={error ? error.message : null}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              multiline
              fullWidth
              error={!!error}
              autoComplete="title"
              variant="outlined"
              label="Description"
              placeholder='e.g. "This is a very great video about life."'
              type="text"
              autoFocus
              helperText={error ? error.message : null}
              minRows={3}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          startIcon={<Upload />}
          size="large"
          style={{
            fontSize: '1.2em',
            textTransform: 'none',
          }}
        >
          Upload
        </Button>
      </Stack>
    </form>
  );
};
