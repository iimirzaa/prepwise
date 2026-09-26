import apiClient from "../api/client";
import { END_POINTS } from "../api/endpoints";

export const interviewService = {
    async generateInterview(form) {
        return await apiClient.post(END_POINTS.interview.generate,form,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            transformRequest: (data) => data, 
        });
    },

   
};