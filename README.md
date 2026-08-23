# Prepwise

Prepwise is an AI-powered interview and viva preparation coach that helps students practice answering interview and viva questions, then get instant, structured feedback on what they said and how they said it.

## Overview

Students record themselves answering common interview or viva questions. Prepwise analyzes the response using AI — evaluating the content of the answer, how it was delivered (pacing, filler words), and body language (eye contact, posture) — then returns actionable feedback so students can improve before the real thing.

## Functionalities

- **Practice Recording**
  Record video/audio responses to common interview and viva questions directly in the app.

- **AI Content Feedback**
  Gemini-powered analysis evaluates the substance of an answer — relevance, clarity, and completeness — and suggests improvements.

- **Speech Analysis**
  Detects filler words ("um," "like," etc.) and evaluates speaking pace, flagging sections that were rushed or dragged.

- **Body Language Analysis**
  Uses pose/face tracking to assess eye contact and posture during the recorded response, surfacing non-verbal cues that affect interview performance.

- **Structured Feedback Reports**
  Consolidates content, speech, and body language scores into a single, easy-to-read report per practice session.

- **Progress Tracking**
  Keeps a history of past practice sessions and scores so students can see improvement over time.

- **Onboarding Flow**
  Guided onboarding screens that introduce the app's features before account creation.

- **Authentication**
  Secure sign-up/login with JWT-based auth; every user's data and session history is tracked on the backend (not just stored client-side).

- **Modern Animated UI**
  Clean, minimal, fully animated interface built for a smooth mobile experience across onboarding, auth, and practice flows.

## Tech Stack

**Frontend**
- React Native
- react-native-linear-gradient (theming/animated gradients)

**Backend**
- Node.js / Express
- Firestore (user records, session history)
- JWT authentication

**AI / Analysis**
- Google Gemini (content feedback)
- Speech analysis (filler word detection, pacing)
- Pose/face tracking (eye contact, posture analysis)






## Roadmap

- [ ] Question bank tailored by field of study
- [ ] Exportable feedback reports (PDF)

