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

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoggedInUser {
  id: number;
  username: string;
}

export type LoginResponse = ApiResponse<
  LoggedInUser & {
    token: string;
  }
>;

export type ApiResponse<T = unknown> = AxiosResponse<T>;
