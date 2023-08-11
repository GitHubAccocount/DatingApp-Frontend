import { defineStore } from 'pinia';
import getQuestions from '@/api/getQuestions';
import getAnswers from '@/api/getAnswers';
import { ref } from 'vue';
import type { Question, Answers } from '@/api/types';

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

  return { questions, answers, FETCH_QUESTIONS, FETCH_ANSWERS };
});
