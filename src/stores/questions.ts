import { defineStore } from 'pinia';
import getQuestions from '@/api/getQuestions';
import { ref } from 'vue';
import type { Question } from '@/api/types';

export const useQuestionsStore = defineStore('questions', () => {
  const questions = ref<Question[]>([]);

  const FETCH_QUESTIONS = async () => {
    const fetchedQuestions = await getQuestions();
    questions.value = fetchedQuestions;
  };

  return { questions, FETCH_QUESTIONS };
});
