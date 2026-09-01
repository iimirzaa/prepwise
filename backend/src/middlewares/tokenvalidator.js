import tokenVerifyValidator from "../validators/tokenvalidator.js";
export function validateToken(req, res, next) {
  const result = tokenVerifyValidator.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.issues });
  }

  req.body = result.data;
  next(); 
}