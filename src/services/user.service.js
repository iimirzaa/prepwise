import apiClient from "../api/client";
import { END_POINTS } from "../api/endpoints";
export const userService={
    async getProfile(){
        return await apiClient.get(END_POINTS.profile.info);

    }
}