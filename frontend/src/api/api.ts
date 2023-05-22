import axios from 'axios';
import {
  ApiResponse,
  Course,
  CreateCourseRequest,
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

export const fetchAllVideoPreviews = ({
  courseId,
  creatorId,
}: {
  courseId?: string;
  creatorId?: string;
}) =>
  axiosInstance.get<unknown, { data: VideoPreview[] }>('/api/videos', {
    params: { courseId, creatorId },
  });

export const fetchAllCourses = () =>
  axiosInstance.get<unknown, { data: Course[] }>('/api/courses');

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
