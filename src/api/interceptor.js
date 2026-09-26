import apiClient from './client';
import {
    getAccessToken,
    getRefreshToken,
    saveTokens,
    isTokenExpired,
    clearTokens,
} from '../storage/authstorage';

import { END_POINTS } from './endpoints';

apiClient.interceptors.request.use(async config => {
    const accessToken = await getAccessToken();

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

let isRefreshing = false;
let refreshPromise = null;

apiClient.interceptors.response.use(
    response => response,

    async error => {
        const originalRequest = error.config;

      
        if (error.response?.status !== 401) {
            return Promise.reject(error);
        }

   
        if (originalRequest._retry) {
            return Promise.reject(error);
        }

   
        if (originalRequest.url === END_POINTS.Auth.Refresh) {
            await clearTokens();
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        const refreshToken = await getRefreshToken();

    
        if (!refreshToken || isTokenExpired(refreshToken)) {
        
            return Promise.reject(
                new Error('Refresh token missing or expired')
            );
        }

        try {
            if (!isRefreshing) {
                isRefreshing = true;

                refreshPromise = apiClient
                    .post(
                        END_POINTS.Auth.Refresh,
                        { refreshToken }
                    )
                    .then(async ({ data }) => {

                        await saveTokens(
                            data.access,
                            data.refresh
                        );

                        return data;
                    })
                    .finally(() => {
                        isRefreshing = false;
                        refreshPromise = null;
                    });
            }

            const data = await refreshPromise;

            
            originalRequest.headers.Authorization =
                `Bearer ${data.access}`;

            return apiClient(originalRequest);

        } catch (refreshError) {

            await clearTokens();

            return Promise.reject(refreshError);
        }
    }
);