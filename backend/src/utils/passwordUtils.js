import argon2 from 'argon2';
import Logger from './logger.js';
export const hashPassword=async(password)=>{
    try{
     const hash=await argon2.hash(password,{
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
export const verifyPassword=async(hash,input)=>{
    return await argon2.verify(hash,input)
}
