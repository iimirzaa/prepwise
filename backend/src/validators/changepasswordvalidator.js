import { z } from 'zod';

const changePasswordVerifyValidator = z.object({
  email: z.string()
    .email("Invalid email address")
    .toLowerCase()
    .trim(),
    otp: z.string()
        .trim()
        .length(6, "OTP must be exactly 6 digits")
        .regex(/^\d{6}$/, "OTP must contain only digits"),
      password: z.string()
        .min(8, "Password must be at least 8 characters")
        .max(64, "Password too long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
    
 

});

export default changePasswordVerifyValidator;