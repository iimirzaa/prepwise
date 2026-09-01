import jwt from 'jsonwebtoken';
import Logger from './logger.js';
import argon2 from 'argon2';
export const generateAccessToken = (paylaod) => {
    return jwt.sign(
        paylaod,
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '15m', issuer: "prepwise", audience: "prepwise-mobile-app" }

    );
}
export const generateRefreshToken =  (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d", issuer: "prepwise", audience: "prepwise-mobile-app" }
    )
}
export const verifyAccessToken = (token) => {
    try {
        return jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET,
            {
                issuer: "prepwise",
                audience: "prepwise-mobile-app"
            }
        );
    } catch (error) {

        if (error.name === "TokenExpiredError") {
            return{

                success:false,
                status:401,
                message: "Access token expired"
            };
        }

        return {
            success:false,
            status:401,
            message: "Invalid token"
        
    };

};
}
export const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(
            token,
            process.env.JWT_REFRESH_SECRET,
            {
                issuer: "prepwise",
                audience: "prepwise-mobile-app"
            }
        );
    } catch (error) {

        if (error.name === "TokenExpiredError") {
           return{

                success:false,
                status:401,
                message: "Access token expired"
            };
        }

             return {
            success:false,
            status:401,
            message: "Invalid token"
        
    };
    }

};


export const hashToken=async(password)=>{
    try{
     const hash=await argon2.hash(password,{
        type:argon2.argon2id,
        memoryCost:2**16,
        timeCost:3,
        parallelism:1

     });
     return hash;
    }catch(e){
    Logger.error("Token Hashing Error",e);
    throw e;
    }

}
export const verifyToken=async(hash,input)=>{
    return await argon2.verify(hash,input)
}
