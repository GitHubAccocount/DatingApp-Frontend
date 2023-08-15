export interface Question {
  text: string;
  id: number;
}

export interface Answers {
  id: number;
  selectedAnswer: string;
}

export interface PersonalInfo {
  gender?: string;
  empathyLevel?: string;
  lookingFor?: string;
  description?: string;
}
