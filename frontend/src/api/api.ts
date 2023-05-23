import axios from 'axios';
import {
  ApiResponse,
  Course,
  CreateCourseRequest,
  UploadVideoRequest,
  FullUser,
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
  axiosInstance.get<unknown, { data: FullUser[] }>('/api/users');

export const fetchAllVideoPreviews = ({
  courseId,
  creatorId,
  search,
}: {
  courseId?: string;
  creatorId?: string;
  search?: string;
}) =>
  axiosInstance.get<unknown, { data: VideoPreview[] }>('/api/videos', {
    params: { courseId, creatorId, search },
  });

export const fetchAllCourses = (creatorId?: string, search?: string) =>
  axiosInstance.get<unknown, { data: Course[] }>('/api/courses', {
    params: { creatorId, search },
  });

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

export const createCourse = (request: CreateCourseRequest) =>
  axiosInstance.post<CreateCourseRequest>('/api/courses', request);

export const updateVideoCourse = (videoId: string, courseId?: string) => {
  if (courseId) {
    return axiosInstance.patch(`/api/videos/${videoId}/course/${courseId}`);
  }
  return axiosInstance.patch(`/api/videos/${videoId}/course`);
};

export const assignUserToTeacher = (user: FullUser) =>
  axiosInstance.post('/api/users/teacher', user);
