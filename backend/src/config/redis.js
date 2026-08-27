import Redis from 'ioredis';
import dotenv from 'dotenv';
import Logger from '../utils/logger.js';
dotenv.config()
const redis=new Redis(process.env.REDIS_URL);

redis.on('connect',()=>{
    Logger.info("Redis connection Successful");
})
redis.on('error', (error) => {
    Logger.error('Redis error:', error);
});

export default  redis;