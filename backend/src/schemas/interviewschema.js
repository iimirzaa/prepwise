import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema(
  {
    // User who created this interview
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    // Interview type selected on Setup screen
    interviewType: {
      type: String,
      enum: ['hr', 'technical', 'behavioural', 'custom'],
      required: true,
    },

    // Target job/role
    targetRole: {
      title: {
        type: String,
        required: true,
      },

      value: {
        type: String,
        required: true,
      },
    },

    // Experience level
    experience: {
      type: String,
      enum: [
        'student',
        'fresher',
        '1_year',
        '2_years',
        '3_years',
        '4_years',
        '5_plus_years',
      ],
      required: true,
    },

    // Interview difficulty
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: true,
    },

    // Skills selected by the user
    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    // Saved resume
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      default: null,
    },

    // Job description
    jobDescriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document',
      default: null,
    },

    // Evaluation settings
    evaluation: {
      type: [String],
      default: [],
    },

    // Interview status
    status: {
      type: String,
      enum: [
        'setup',
        'in_progress',
        'completed',
        'cancelled',
      ],
      default: 'setup',
    },

    // Questions generated for this interview
    questions: [
      {
        question: {
          type: String,
          required: true,
        },

        answer: {
          type: String,
          default: '',
        },

        score: {
          type: Number,
          default: null,
        },

        feedback: {
          type: String,
          default: '',
        },

        answeredAt: {
          type: Date,
          default: null,
        },
      },
    ],

    // Overall interview result
    result: {
      overallScore: {
        type: Number,
        default: null,
      },

      strengths: {
        type: [String],
        default: [],
      },

      improvements: {
        type: [String],
        default: [],
      },

      completedAt: {
        type: Date,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  }
);

// User's latest interviews first
interviewSchema.index({
  userId: 1,
  createdAt: -1,
});

const Interview = mongoose.model('Interview', interviewSchema);

export default Interview;