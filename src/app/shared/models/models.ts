export interface Exam {
  title: string;
  duration: number;
  atLeast: number;
  questions: Question[];
}

export interface Question {
  question: string;
  answer: string;
  options: string[];
}
