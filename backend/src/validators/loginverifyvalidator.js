import { z } from 'zod';

const loginVerifyValidator = z.object({
  email: z.string()
    .email("Invalid email address")
    .toLowerCase()
    .trim(),
   password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password too long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),

});

export default loginVerifyValidator;