import { sendMail } from "../utils/mailUtils.js";
import { hashOtp, verifyOtp } from "../utils/otpUtils.js";
import redis from '../config/redis.js';

const OTP_TTL_SEC = 300;

async function generateOtp() {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const hashedOtp = await hashOtp(otp.toString());
  return { otp, hashedOtp };
}

export async function requestOtp(mail) {
    const normalizedMail = mail.trim().toLowerCase();
  const Key = `otp:${normalizedMail}`;
  const { otp, hashedOtp } = await generateOtp();
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

export async function verifyUserOtp(mail, otp) {
  const normalizedMail = mail.trim().toLowerCase();
  const Key = `otp:${normalizedMail}`;
  const attemptsKey = `otp:attempts:${normalizedMail}`;

  const hashedOtp = await redis.get(Key);

  if (!hashedOtp) {
    return {
      success: false,
      status: 400,
      message: "OTP expired or not found. Please request a new one.",
    };
  }

  const isMatch = await verifyOtp(hashedOtp,otp);

  if (!isMatch) {
  
    const attempts = await redis.incr(attemptsKey);
    if (attempts === 1) {
      await redis.expire(attemptsKey, OTP_TTL_SEC);
    }

    const MAX_ATTEMPTS = 5;
    if (attempts >= MAX_ATTEMPTS) {
      await redis.del(Key);
      await redis.del(attemptsKey);
      return {
        success: false,
        status: 429,
        message: "Too many incorrect attempts. Please request a new OTP.",
      };
    }

    return {
      success: false,
      status: 400,
      message: `Invalid OTP. ${MAX_ATTEMPTS - attempts} attempt(s) remaining.`,
    };
  }

 
  await redis.del(Key);
  await redis.del(attemptsKey);

  return {
    success: true,
    status: 200,
    message: "OTP verified successfully.",
  };
}