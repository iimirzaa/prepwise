import userRepository from "../repositories/user.repository.js";

import { hashPassword } from "../utils/passwordUtils.js";
import requestOtp from "./otp.service.js";

const authService={
    async singUp({fullname,email,password}){
        const existingUser=await userRepository.findByEmail(email);
        console.log(password);
        if(existingUser){
            return {

            status:409,
            success:false,
            message:"User already exits"};
        }
        const hashedPassword=await hashPassword(password);
        const user=await userRepository.create({
            fullname,
            email,
            password:hashedPassword,
    
        });
        return requestOtp(email);

    }
}
export default authService;