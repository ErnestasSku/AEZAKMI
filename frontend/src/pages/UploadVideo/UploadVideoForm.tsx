import { useState } from 'react';
import { DragDropFiles } from './DragDropFiles';

export const UploadVideoForm = () => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <form>
      <DragDropFiles file={file} setFile={setFile} />
    </form>
  );
};
