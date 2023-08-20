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

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  profileImg: string;
  ownedEmphatyLevel: string;
  gender: string;
  lookingFor: string;
  empathyLevel: string;
  description: string;
}
