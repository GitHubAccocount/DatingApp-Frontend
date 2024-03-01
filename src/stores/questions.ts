import { defineStore } from 'pinia';
import getQuestions from '@/api/getQuestions';
import getAnswers from '@/api/getAnswers';
import getPersonalInfo from '@/api/getPersonalInfo';
import getUsers from '@/api/getUsers';
import { computed, ref } from 'vue';
import type {
  Question,
  Answers,
  PersonalInfo,
  User,
  EmpathyErrors,
  PersonalInfoInterfce
} from '@/api/types';
import { useUserStore } from './user';
import axios from 'axios';
import { useRouter } from 'vue-router';

export const useQuestionsStore = defineStore('questions', () => {
  const userStore = useUserStore();
  const router = useRouter();

  const isLoading = ref(false);

  const questions = ref<Question[]>([]);
  const FETCH_QUESTIONS = async () => {
    const fetchedQuestions = await getQuestions();
    questions.value = fetchedQuestions;
  };

  const empathyErrors = ref<EmpathyErrors>({});
  const SUBMIT_EMPATHY = async (form: object) => {
    isLoading.value = true;
    await userStore.GET_TOKEN();
    try {
      const response = await axios.post('http://localhost:8000/api/answers', form);
      if (response.status == 204) {
        router.push({ path: 'form/2' });
      }
    } catch (error: any) {
      if (error.response.status == 422) {
        empathyErrors.value = error.response.data.errors;
      }
    } finally {
      isLoading.value = false;
    }
  };

  const personalInformationErrors = ref<PersonalInfoInterfce>({});
  const SUBMIT_PERSONAL_INFORMATION = async (form: object, formWindow: HTMLFormElement | null) => {
    isLoading.value = true;
    await userStore.GET_TOKEN();
    try {
      const response = await axios.post('http://localhost:8000/api/personal-informations', form);
      if (response.status == 204) {
        router.push({ path: '/find' });
      }
    } catch (error: any) {
      if (error.response.status == 422) {
        personalInformationErrors.value = error.response.data.errors;
        formWindow?.scrollIntoView({ behavior: 'smooth' });
      }
    } finally {
      isLoading.value = false;
    }
  };

  const empathyTestState = ref(false);
  const GET_EMPATHY_STATE = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/answers/get-form-submission-state'
      );
      empathyTestState.value = response.data.submitted;
    } catch (error: any) {}
  };

  const personalInfoTestState = ref(null);
  const GET_PERSONAL_INFO_STATE = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/personal-informations/get-form-submission-state'
      );
      personalInfoTestState.value = response.data.submitted;
    } catch (error: any) {}
  };

  return {
    questions,
    empathyErrors,
    personalInformationErrors,
    isLoading,
    empathyTestState,
    personalInfoTestState,
    FETCH_QUESTIONS,
    SUBMIT_EMPATHY,
    SUBMIT_PERSONAL_INFORMATION,
    GET_EMPATHY_STATE,
    GET_PERSONAL_INFO_STATE
  };
});
