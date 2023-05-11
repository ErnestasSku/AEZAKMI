import { Delete, UploadFile } from '@mui/icons-material';
import { Button, Container, IconButton } from '@mui/material';
import { useRef } from 'react';
import { DragEvent } from 'react';

interface Props {
  file: File | null;
  setFile: (file: File | null) => void;
}

export const DragDropFiles = ({ file, setFile }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    setFile(event.dataTransfer?.files[0]);
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          outline: '2px dashed black',
          padding: '10px',
          width: '60vw',
          height: '60vh',
          display: 'flex',
          justifyContent: 'center',
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Container
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <UploadFile style={{ fontSize: '3em' }} />
          <div style={{ fontSize: '1.5em' }}>
            <p style={{ margin: '10px 0 0 0' }}>Drag and Drop video here</p>
            <p style={{ margin: '0 0 10px 0' }}>or</p>
          </div>
          <input
            hidden
            ref={inputRef}
            type="file"
            accept="video/mp4"
            onChange={event => {
              if (!event.target.files?.length) return;
              setFile(event.target.files?.[0]);
              event.target.value = '';
            }}
          />
          <Button onClick={() => inputRef.current?.click()} variant="contained">
            Select file (.mp4)
          </Button>
          <div
            style={{
              backgroundColor: 'lightgray',
              borderRadius: '10px',
              fontWeight: 'lighter',
              padding: '0px 20px',
              marginTop: '16px',
              color: 'black',
            }}
          >
            {file ? (
              <>
                <p style={{ display: 'inline-block' }}>
                  {file.name} ({formatBytes(file.size)})
                </p>
                <IconButton
                  onClick={() => setFile(null)}
                  size="small"
                  style={{ marginLeft: '10px' }}
                >
                  <Delete />
                </IconButton>
              </>
            ) : (
              <p>None selected...</p>
            )}
          </div>
        </Container>
      </div>
    </Container>
  );
};

function formatBytes(bytes: number, decimals = 1) {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
