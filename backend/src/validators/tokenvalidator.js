import { z } from 'zod';

const tokenVerifyValidator = z.object({
  refreshToken: z.string()

});

export default tokenVerifyValidator;