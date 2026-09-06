import emailVerifyValidator from "../validators/emailvalidator.js";
export function validateEmail(req, res, next) {
  const result = emailVerifyValidator.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.issues });
  }

  req.body = result.data;
  next(); 
}