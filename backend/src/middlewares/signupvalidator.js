import userValidator from "../validators/uservalidator";
export function validateSignup(req, res, next) {
  const result = userValidator.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.issues });
  }

  req.body = result.data; // overwrite with parsed/cleaned data (trimmed, lowercased, etc.)
  next(); // pass control to the next handler
}