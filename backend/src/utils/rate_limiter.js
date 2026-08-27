import rateLimit  from "express-rate-limit";
import Rediesstore from 'rate-limit-redis';
import redis from '../config/redis.js';
const createLimiter=(max,windowMinutes,message)=>rateLimit(
    {
        windowMs:windowMinutes*60*1000,
        max,
        legacyHeaders:false,
        standardHeaders:true,
        message:{success:false,message},
        statusCode:429,
        store:new Rediesstore({sendCommand:(...args)=>redis.call(...args)})
    }
);
export const AuthLimiter=createLimiter(10,10,"Try Again after 10 minutes.");