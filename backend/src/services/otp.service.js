import { sendMail } from "../utils/mailUtils.js";
import { hashOtp } from "../utils/otpUtils.js";
import redis from '../config/redis.js';
const OTP_TTL_SEC=300
async function generateOtp(){
    const otp = Math.floor(100000 + Math.random() * 900000);
    const hashedOtp=await hashOtp(otp.toString());
    return {otp,hashedOtp}

}
async function requestOtp(mail){
    const Key=`otp:${mail}`;
    const{otp,hashedOtp}=await generateOtp();
    const result = await redis.set(
    Key,
    hashedOtp,
    "EX",
    OTP_TTL_SEC,
    "NX"
);
  if (result === null) {

    const ttl = await redis.ttl(Key);
    return {
      success: false,
      status: 429, // Too Many Requests
      message: `An OTP was already sent. Please try again in ${ttl} seconds.`,
      retryAfter: ttl,
    };
  }

  try {
    await sendMail(mail, otp);
  } catch (err) {

    await redis.del(Key);
    return {
      success: false,
      status: 502, // Bad Gateway — upstream mail service failed
      message: "Failed to send OTP email. Please try again.",
    };
  }

  return {
    success: true,
    status: 200,
    message: "OTP sent to your email.",
  }

}
export default requestOtp;