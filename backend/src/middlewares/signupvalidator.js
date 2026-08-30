import userValidator from "../validators/uservalidator.js";
export function validateSignup(req, res, next) {
  const result = userValidator.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.issues });
  }

  req.body = result.data;
  next(); 
}