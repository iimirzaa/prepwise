import { z } from 'zod';

const emailVerifyValidator = z.object({
  email: z.string()
    .email("Invalid email address")
    .toLowerCase()
    .trim(),
 

});

export default emailVerifyValidator;