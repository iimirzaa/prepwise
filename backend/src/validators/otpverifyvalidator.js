import { z } from 'zod';

const otpVerifyValidator = z.object({
  email: z.string()
    .email("Invalid email address")
    .toLowerCase()
    .trim(),
  otp: z.string()
    .trim()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only digits"),
});

export default otpVerifyValidator;