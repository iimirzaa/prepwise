import apiClient from "../api/client";
import { END_POINTS } from "../api/endpoints";

export const userService = {
    async getProfile() {
        return await apiClient.get(END_POINTS.profile.info);
    },

    async uploadProfilePic(form) {
        return apiClient.post(END_POINTS.profile.Upload, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            transformRequest: (data) => data, 
        });
    },
    async updateUser(data){
        return apiClient.patch(END_POINTS.profile.Update,data);
    }
};