import { defineStore } from 'pinia';
import getQuestions from '@/api/getQuestions';
import getAnswers from '@/api/getAnswers';
import getPersonalInfo from '@/api/getPersonalInfo';
import { ref } from 'vue';
import type { Question, Answers, PersonalInfo } from '@/api/types';

export const useQuestionsStore = defineStore('questions', () => {
  const questions = ref<Question[]>([]);
  const FETCH_QUESTIONS = async () => {
    const fetchedQuestions = await getQuestions();
    questions.value = fetchedQuestions;
  };

  const answers = ref<Answers[]>([]);
  const FETCH_ANSWERS = async () => {
    const fetchedAnswers = await getAnswers();
    answers.value = fetchedAnswers;
  };

  const personalInfo = ref<PersonalInfo[]>([]);
  const FETCH_PERSONAL_INFO = async () => {
    const fetchPersonalInfo = await getPersonalInfo();
    personalInfo.value = fetchPersonalInfo;
  };

  return { questions, answers, personalInfo, FETCH_QUESTIONS, FETCH_ANSWERS, FETCH_PERSONAL_INFO };
});
