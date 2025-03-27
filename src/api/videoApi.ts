import axios from 'axios';
import { Video, VideoResponse } from '../types/video';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
});

export const downloadVideo = async (videoUrl: string): Promise<VideoResponse> => {
  const response = await api.post<VideoResponse>('/video/download/', {
    url: videoUrl
  });
  return response.data;
};