import argon2 from 'argon2';
import Logger from './logger.js';
export const hashOtp=async(otp)=>{
    try{
     const hash=await argon2.hash(otp,{
        type:argon2.argon2id,
        memoryCost:2**16,
        timeCost:3,
        parallelism:1

     });
     return hash;
    }catch(e){
    Logger.error("Password Hashing Error",e);
    throw e;
    }

}
export const verifyOtp=async(hash,input)=>{
    return await argon2.verify(hash,input)
}
