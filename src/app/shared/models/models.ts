export interface Exam {
  title: string;
  duration: number;
  atLeast: number;
  questions: Question[];
}

export type QuestionType = 'radio' | 'checkbox';

export interface Question {
  question: string;
  answer: string | string[];
  userAnswer: string | string[];
  options: string[];
  control: QuestionType;
}
