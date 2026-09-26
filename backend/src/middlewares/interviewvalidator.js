import {createInterviewSchema} from "../validators/interview.validator.js";
export function validateDetail(req, res, next) {
    console.log('REQ BODY:', req.body);

  const result = createInterviewSchema.safeParse(req.body);

  if (!result.success) {
    console.log(result.error.issues);
    return res.status(400).json({ errors: result.error.issues });
  }

  req.body = result.data;
  next(); 
}