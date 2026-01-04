export interface InterviewConfig {
  role: string;
  experienceLevel: string;
  questions: string[];
}

export interface QuestionAnswer {
  question: string;
  userAnswer: string;
  evaluation: {
    score: number;
    feedback: string;
    sampleAnswer: string;
  };
}

export interface InterviewState {
  config: InterviewConfig | null;
  currentQuestionIndex: number;
  answers: QuestionAnswer[];
  isInterviewComplete: boolean;
  isRecording: boolean;
  transcript: string;
}
