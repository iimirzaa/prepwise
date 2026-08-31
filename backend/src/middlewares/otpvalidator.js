import otpVerifyValidator from "../validators/otpverifyvalidator.js";
export function validateOtp(req, res, next) {
  const result = otpVerifyValidator.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.issues });
  }

  req.body = result.data;
  next(); 
}