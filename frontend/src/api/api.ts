import axios from 'axios';
import {
  ApiResponse,
  Course,
  UploadVideoRequest,
  User,
  VideoData,
  VideoPreview,
} from '.';

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
  axiosInstance.get<unknown, { data: VideoPreview[] }>('/api/videos');

export const fetchVideo = (id: string) =>
  axiosInstance.get<unknown, { data: VideoPreview }>(`/api/videos/${id}`);

export const fetchVideoBlob = (id: string) =>
  axiosInstance.get<unknown, VideoData>(`/api/videos/${id}/data`, {
    responseType: 'blob',
  });

export const fetchUserCourses = (id: number) =>
  axiosInstance.get<unknown, ApiResponse<Course[]>>(`/api/users/${id}/courses`);

export const uploadVideo = (request: UploadVideoRequest) =>
  axiosInstance.post<UploadVideoRequest>(`/api/videos`, request, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
