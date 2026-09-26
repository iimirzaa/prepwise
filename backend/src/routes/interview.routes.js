import express from 'express';
import { InterviewLimiter } from '../utils/rate_limiter.js';
import { handleUpload } from '../middlewares/uploadpdf.js';
import { interviewController } from '../controllers/interview.controller.js';
import verifyToken from '../middlewares/tokenverifier.js';
import { validateDetail } from '../middlewares/interviewvalidator.js';
const InterviewRouter=express();
InterviewRouter.post('/generate',InterviewLimiter,verifyToken, handleUpload,validateDetail,interviewController.generateQuestion);
export default InterviewRouter;
