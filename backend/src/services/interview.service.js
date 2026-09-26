import extractText from "../jobs/extractors/extract.text.js";
import mongoose from "mongoose";
import generateQuestion from "../jobs/generators/generateQuestion.js";
import buildInterviewPrompt from "../utils/interviewprompt.js";
import interviewRepository from "../repositories/interview.repository.js";
import Logger from "../utils/logger.js";

export const interviewService = {
  async generateMcqs(user, files, form) {
    const {
      interviewType,
      targetRole,
      experience,
      difficulty,
      skills,
      questionCount,
    } = form;

    if (!files) {
      return { success: false, status: 404, message: "Please Upload Resume!" };
    }

    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const resumeFile = files?.resume?.[0];
      const jdFile = files?.jobDescription?.[0];

      const resumeText = resumeFile ? await extractText(resumeFile) : '';
      const jobDescriptionText = jdFile ? await extractText(jdFile) : '';

      const prompt = buildInterviewPrompt({
        interviewType,
        targetRole,
        experience,
        difficulty,
        skills,
        resumeText,
        jobDescriptionText,
        questionCount: Number(questionCount) || 10,
      });


      const raw = await generateQuestion(prompt);


      let parsed;
      try {
        const cleaned = raw.replace(/```json|```/g, '').trim();
        parsed = JSON.parse(cleaned);
      } catch {
        throw new Error('AI returned an invalid response. Please try again.');
      }

      if (!Array.isArray(parsed.questions) || parsed.questions.length === 0) {
        throw new Error('AI did not return any questions. Please try again.');
      }

  
      const [interview] = await interviewRepository.create(
        [
          {
            userId: user.id ?? user._id,
            interviewType,
            targetRole,
            experience,
            difficulty,
            skills,
            resumeId: resumeFile?.publicId ?? null,
            jobDescriptionId: jdFile?.publicId ?? null,
            status: 'in_progress',
            questions: parsed.questions.map((q) => ({ question: q.question })),
          },
        ],
        { session }
      );

      await session.commitTransaction();

      return {
        success: true,
        status: 200,
        message: 'Interview questions generated successfully',
        data: {
          interviewId: interview._id,
          questions: interview.questions,
        },
      };
    } catch (error) {
      await session.abortTransaction();
      Logger.error(error);
      return { success: false, status: 409, message: error.message };
    } finally {
      session.endSession();
    }
  },
};