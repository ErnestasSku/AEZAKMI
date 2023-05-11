import axios from 'axios';
import { RegisterUserRequest, UploadVideoRequest, User, Video } from '.';

export const fetchAllUsers = () =>
  axios.get<unknown, { data: User[] }>('/api/users');

export const registerUser = (request: RegisterUserRequest) =>
  axios.post('/api/users', request);

export const fetchAllVideoPreviews = () =>
  axios.get<unknown, { data: Video[] }>('/api/videos');

export const fetchVideo = (id: string) =>
  axios.get<unknown, { data: Video }>(`/api/videos/${id}`);

export const uploadVideo = (request: UploadVideoRequest) => {
  return axios.post(
    `/api/videos`,
    {
      file: request.data,
      'videoDto.title': request.title,
      'videoDto.description': request.description || '',
      'videoDto.videoUrl': '',
      'videoDto.courseId': '1',
    },
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};
