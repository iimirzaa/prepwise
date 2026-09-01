import { z } from 'zod';

const tokenVerifyValidator = z.object({
  refresh: z.string()

});

export default tokenVerifyValidator;