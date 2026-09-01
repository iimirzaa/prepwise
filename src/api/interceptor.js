import apiClient from "./client";
import { getAccessToken, getRefreshToken, saveTokens } from "../storage/authstorage";
import { END_POINTS } from "./endpoints";
import axios from "axios";
apiClient.interceptors.request.use(async (config) => {
    const accessToken = await getAccessToken();
    if (accessToken) config.headers.Authorization = `Beareer ${accessToken}`;
    return config;
});
apiClient.interceptors.request.use(
    (res) => res,
    async (error) => {
        if (error.response?.status === 401) {
            const refreshToken = await getRefreshToken();
            if (!refreshToken || isTokenExpired(refreshToken)) {
                throw new Error('Refresh token missing or expired');
            }
            const { data } = await apiClient.post(END_POINTS.Auth.Refresh, { refreshToken });
            await saveTokens(data.accessToken, data.refreshToken);
            error.config.headers.Authorization = `Bearer ${data.accessToken}`;
            return apiClient(error.config);
        }
        return Promise.reject(error);
    }


);