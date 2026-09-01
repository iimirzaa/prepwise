import apiClient from "../api/client";
import { END_POINTS } from "../api/endpoints";
export const authService={
     async  signUp(fullname,email,password){
        return apiClient.post(END_POINTS.Auth.Signup,{fullname,email,password});
    },
    async  verifyOtp(email,otp){
        return apiClient.post(END_POINTS.Auth.Verify,{email,otp});
    },
     async  login(email,password){
        return apiClient.post(END_POINTS.Auth.Login,{email,password});
    },
    async  logout(token){
        return apiClient.post(END_POINTS.Auth.Logout,{token});
    },

}