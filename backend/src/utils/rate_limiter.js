import rateLimit  from "express-rate-limit";
import {RedisStore} from 'rate-limit-redis';
import redis from '../config/redis.js';

const createLimiter = (max, windowMinutes, message, prefixName) => rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    max,
    legacyHeaders: false,
    standardHeaders: true,
    message: { success: false, message },
    statusCode: 429,
    store: new RedisStore({
        sendCommand: (...args) => redis.call(...args),
        prefix: `rl:${prefixName}:`, 
    })
});

export const AuthLimiter = createLimiter(10, 1, "Try Again after 1 minutes.", "auth");
export const ProfileLimiter = createLimiter(10, 1, "Try again after a while", "profile");
