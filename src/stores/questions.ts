import { defineStore } from 'pinia';
import getQuestions from '@/api/getQuestions';
import getAnswers from '@/api/getAnswers';
import getPersonalInfo from '@/api/getPersonalInfo';
import getUsers from '@/api/getUsers';
import { computed, ref } from 'vue';
import type { Question, Answers, PersonalInfo, User } from '@/api/types';
import { useUserStore } from './user';

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

  const users = ref<User[]>([]);
  const FETCH_USERS = async () => {
    const fetchUsers = await getUsers();
    users.value = fetchUsers;
  };

  const minusAnswerIds = [2, 3, 4, 6, 11, 13, 15, 20, 21, 22, 23, 24, 26, 28, 30, 32, 33];
  const EXTRACT_MINUS_SCORE = computed(() => {
    return answers.value.filter((answer) => minusAnswerIds.includes(answer.id));
  });

  const MINUS_SCORE = computed(() => {
    let number = 0;
    EXTRACT_MINUS_SCORE.value.forEach((answer) => {
      number += -parseInt(answer.selectedAnswer);
    });
    return number;
  });

  const plusAnswerIds = [1, 5, 7, 8, 9, 10, 12, 14, 16, 17, 18, 19, 25, 27, 29, 31];
  const EXTRACT_PLUS_SCORE = computed(() => {
    return answers.value.filter((answer) => plusAnswerIds.includes(answer.id));
  });

  const PLUS_SCORE = computed(() => {
    let number = 0;
    EXTRACT_PLUS_SCORE.value.forEach((answer) => {
      number += parseInt(answer.selectedAnswer);
    });
    return number;
  });

  const TOTAL_SCORE = computed(() => {
    return MINUS_SCORE.value + PLUS_SCORE.value;
  });

  const USER_EMPATHY_LEVEL_MALE = computed(() => {
    if (TOTAL_SCORE.value < 15) {
      return 'low';
    } else if (TOTAL_SCORE.value >= 15 && TOTAL_SCORE.value < 31) {
      return 'average';
    } else if (TOTAL_SCORE.value >= 31 && TOTAL_SCORE.value < 47) {
      return 'high';
    } else if (TOTAL_SCORE.value >= 47) {
      return 'very high';
    }
  });

  const USER_EMPATHY_LEVEL_FEMALE = computed(() => {
    if (TOTAL_SCORE.value < 29) {
      return 'low';
    } else if (TOTAL_SCORE.value >= 29 && TOTAL_SCORE.value < 59) {
      return 'average';
    } else if (TOTAL_SCORE.value >= 59 && TOTAL_SCORE.value < 89) {
      return 'high';
    } else if (TOTAL_SCORE.value >= 89) {
      return 'very high';
    }
  });

  const allAge = ref([
    { id: 'VaryYoungAdulthood', value: '18-25' },
    { id: 'YoungAdulthood', value: '25-35' },
    { id: 'MidAdulthood', value: '35-45' },
    { id: 'Adulthood', value: '45-55' },
    { id: 'LateAdulthood', value: '55+' }
  ]);

  const SELECTED_AGE = computed(() => {
    const userStore = useUserStore();
    return userStore.selectedAge;
  });

  const FILTER_BY_AGE = (user: User) => {
    if (SELECTED_AGE.value.length === 0) {
      return true;
    } else if (
      user.age >= 18 &&
      user.age <= 25 &&
      SELECTED_AGE.value.includes('VaryYoungAdulthood')
    ) {
      return true;
    } else if (user.age >= 25 && user.age <= 35 && SELECTED_AGE.value.includes('YoungAdulthood')) {
      return true;
    } else if (user.age >= 35 && user.age <= 45 && SELECTED_AGE.value.includes('MidAdulthood')) {
      return true;
    } else if (user.age >= 45 && user.age <= 55 && SELECTED_AGE.value.includes('Adulthood')) {
      return true;
    } else if (user.age >= 55 && SELECTED_AGE.value.includes('LateAdulthood')) {
      return true;
    }
  };

  const FILTERED_USERS = computed(() => {
    return users.value
      .filter((user) => {
        const matchingPersonalInfo = personalInfo.value.find((el) => {
          return user.gender === el.lookingFor;
        });
        return matchingPersonalInfo !== undefined;
      })
      .filter((user) => {
        const matchingPersonalInfo = personalInfo.value.find((el) => {
          return user.lookingFor === el.gender;
        });
        return matchingPersonalInfo !== undefined;
      })
      .filter((user) => {
        const matchingPersonalInfo = personalInfo.value.find((el) => {
          return user.ownedEmphatyLevel === el.empathyLevel;
        });
        return matchingPersonalInfo !== undefined;
      })
      .filter((user) => {
        if (
          personalInfo.value.find((el) => {
            return el.gender === 'female';
          })
        ) {
          return user.empathyLevel === USER_EMPATHY_LEVEL_FEMALE.value;
        } else if (
          personalInfo.value.find((el) => {
            return el.gender === 'male';
          })
        ) {
          return user.empathyLevel === USER_EMPATHY_LEVEL_MALE.value;
        }
      })
      .filter((user) => {
        return FILTER_BY_AGE(user);
      });
  });

  return {
    questions,
    answers,
    personalInfo,
    users,
    allAge,
    TOTAL_SCORE,
    EXTRACT_MINUS_SCORE,
    EXTRACT_PLUS_SCORE,
    MINUS_SCORE,
    PLUS_SCORE,
    SELECTED_AGE,
    FILTERED_USERS,
    USER_EMPATHY_LEVEL_MALE,
    USER_EMPATHY_LEVEL_FEMALE,
    FETCH_QUESTIONS,
    FETCH_ANSWERS,
    FETCH_PERSONAL_INFO,
    FILTER_BY_AGE,
    FETCH_USERS
  };
});
