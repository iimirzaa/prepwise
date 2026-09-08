import tokenVerifyValidator from "../validators/tokenvalidator.js";
export function validateToken(req, res, next) {
  console.log(req.body);
  const result = tokenVerifyValidator.safeParse(req.body);

  if (!result.success) {
    console.log(result);
    return res.status(400).json({ errors: result.error.issues });
  }

  req.body = result.data;
  next(); 
}