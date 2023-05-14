import axios from 'axios';
import { UploadVideoRequest, User, Video } from '.';

// Create an Axios instance
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.error('No token found for API request');
  }
  return config;
});

export const fetchAllUsers = () =>
  axiosInstance.get<unknown, { data: User[] }>('/api/users');

export const fetchAllVideoPreviews = () =>
  axiosInstance.get<unknown, { data: Video[] }>('/api/videos');

export const fetchVideo = (id: string) =>
  axiosInstance.get<unknown, { data: Video }>(`/api/videos/${id}`);

export const uploadVideo = (request: UploadVideoRequest) => {
  return axiosInstance.post(
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
