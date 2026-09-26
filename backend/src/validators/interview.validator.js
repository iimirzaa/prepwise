import { z } from 'zod';

const objectId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format');

export const createInterviewSchema = z.object({
  interviewType: z.enum(
    ['hr', 'technical', 'behavioural', 'custom'],
    {
      message: 'Invalid interview type',
    }
  ),

  targetRole: z.object({
    title: z
      .string()
      .trim()
      .min(2, 'Role title is required')
      .max(100),

    value: z
      .string()
      .trim()
      .min(2, 'Role value is required')
      .max(100),
  }),

  experience: z.enum([
    'student',
    'fresher',
    '1_year',
    '2_years',
    '3_years',
    '4_years',
    '5_plus_years',
  ]),

  difficulty: z.enum([
    'easy',
    'medium',
    'hard',
  ]),

  skills: z
    .array(
      z
        .string()
        .trim()
        .min(1)
        .max(50)
    )
    .max(20)
    .default([]),

  resumeId: objectId.nullable().optional(),

  jobDescriptionId: objectId.nullable().optional(),

  evaluation: z
    .array(
      z
        .string()
        .trim()
        .min(1)
        .max(50)
    )
    .max(20)
    .default([]),
});