import apiClient from "./client";
import { getAccessToken, getRefreshToken, saveTokens,isTokenExpired } from "../storage/authstorage";
import { END_POINTS } from "./endpoints";
import axios from "axios";
apiClient.interceptors.request.use(async (config) => {
    const accessToken = await getAccessToken();
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});
let isRefreshing = false;
let refreshPromise = null;

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // Don't touch non-401s
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Don't retry the refresh call itself, and don't retry a request twice
    if (originalRequest._retry || originalRequest.url === END_POINTS.Auth.Refresh) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    const refreshToken = await getRefreshToken();
    if (!refreshToken || isTokenExpired(refreshToken)) {
      return Promise.reject(new Error('Refresh token missing or expired'));
    }

    try {
      // Share one in-flight refresh across all concurrent 401s
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = apiClient
          .post(END_POINTS.Auth.Refresh, { refreshToken })
          .then(({ data }) => saveTokens(data.accessToken, data.refreshToken).then(() => data))
          .finally(() => {
            isRefreshing = false;
          });
      }

      const data = await refreshPromise;
      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
      return apiClient(originalRequest);
    } catch (refreshErr) {
      return Promise.reject(refreshErr);
    }
  }
);


