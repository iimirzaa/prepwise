import loginVerifyValidator from "../validators/loginverifyvalidator.js";
export function validateLogin(req, res, next) {
  const result = loginVerifyValidator.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.issues });
  }

  req.body = result.data;
  next(); 
}