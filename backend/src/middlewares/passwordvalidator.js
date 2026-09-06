import changePasswordVerifyValidator from "../validators/changepasswordvalidator.js";
export function validateChangePassword(req, res, next) {
  const result = changePasswordVerifyValidator.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.issues });
  }

  req.body = result.data;
  next(); 
}