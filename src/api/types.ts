export interface Question {
  question: string;
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

export interface SignUpErrors {
  name?: string[];
  surname?: string[];
  email?: string[];
  birthday?: string[];
  password?: string[];
  password_confirmation?: string[];
}

export interface EmpathyErrors {
  [key: string]: string[] | undefined;
}

export interface PersonalInfoInterfce {
  gender?: string[];
  empathyLevel?: string[];
  lookingFor?: string[];
  description?: string[];
}

export interface Users {
  id: number;
  profile_picture: string;
  user_id: number;
  name: string;
  birthday: Date;
  personal_information: PersonalInformation[];
}

interface PersonalInformation {
  description: string;
}

export interface Participant {
  id: number;
  name: string;
  profile_picture: string;
}

export interface Chat {
  id: number;
  participants: Participant[];
  messages: Message[];
}

export interface Message {
  id: number;
  message: string;
  chat_id: number;
  user_id: number;
  data: {
    seenBy: any[]; // Define the type for seenBy array
    status: string;
  };
  created_at: string;
  sender: {
    id: number;
    name: string;
    surname: string;
    profile_picture: string;
  };
}
