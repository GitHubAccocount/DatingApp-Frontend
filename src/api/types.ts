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

export interface Blog {
  id: number;
  title: string;
  date: string;
  img: string;
  subtitle1: string;
  content1: string;
  subtitle2: string;
  content2: string;
  subtitle3: string;
  content3: string;
  content4: string;
  subtitle5: string;
  content5: string;
  subtitle6: string;
  content6: string;
  subtitle7: string;
  content7: string;
}
