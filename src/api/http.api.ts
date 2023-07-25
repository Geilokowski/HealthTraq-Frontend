import axios from 'axios';
import { AxiosError } from 'axios';
import { ApiError } from '@app/api/ApiError';
import { readToken } from '@app/services/localStorage.service';

console.log(process.env.REACT_APP_BASE_URL);
export const httpApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

httpApi.interceptors.request.use((config) => {
  const token = readToken();

  if (token) {
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  }

  return config;
});

export type SimpleFetchError = ApiError<ApiErrorData>;
httpApi.interceptors.response.use(undefined, (error: AxiosError) => {
  throw new ApiError<ApiErrorData>(error.response?.data.message || error.message, {
    status: error.response?.status,
    axiosError: error,
  });
});

export interface ApiErrorData {
  status?: number;
  axiosError: AxiosError;
}
