import { AxiosResponse } from 'axios';

export interface User {
  id: number;
  email: string;
  password: string;
  username: string;
  role_id: unknown;
}

export interface RegisterUserRequest {
  username: string;
  email: string;
  password: string;
}

export interface VideoPreview {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  courseId?: number;
}

export interface VideoData {
  data: Blob;
}

export interface UploadVideoRequest {
  title: string;
  description?: string;
  video: File;
  image: File;
  courseId?: number;
}

export interface CreateCourseRequest {
  name: string;
  description: string;
  videoIds?: string[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export type Role = 'ADMIN' | 'TEACHER' | 'USER';

export interface LoggedInUser {
  id: number;
  username: string;
  role: Role;
}

export interface Course {
  id: number;
  name: string;
  description: string;
  creator: Creator;
  videoCount: number;
}

export interface Creator {
  id: number;
  username: string;
}

export type LoginResponse = ApiResponse<
  LoggedInUser & {
    token: string;
  }
>;

export type ApiResponse<T = unknown> = AxiosResponse<T>;
