import { setActivePinia, createPinia } from 'pinia';
import { useQuestionsStore } from '@/stores/questions';
import { sampleUsers } from 'tests/utils/sampleUsers';
import axios from 'axios';

vi.mock('axios');
const mockedAxiosGet = vi.mocked(axios.get);

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  describe('FETCH_QUESTIONS', () => {
    it('fetch date and stores them in constant', async () => {
      mockedAxiosGet.mockResolvedValue({ data: [{ text: 'text', id: 1 }] });
      const questionsStore = useQuestionsStore();
      await questionsStore.FETCH_QUESTIONS();

      expect(questionsStore.questions).toEqual([{ text: 'text', id: 1 }]);
    });
  });

  describe('FETCH_ANSWERS', () => {
    it('fetch date and stores them in constatnt', async () => {
      mockedAxiosGet.mockResolvedValue({ data: [{ id: 1, selectedAnswer: '4' }] });
      const questionsStore = useQuestionsStore();
      await questionsStore.FETCH_ANSWERS();

      expect(questionsStore.answers).toEqual([{ id: 1, selectedAnswer: '4' }]);
    });
  });

  describe('FETCH_PERSONAL_INFO', () => {
    it('fetch date and stores them in constant', async () => {
      mockedAxiosGet.mockResolvedValue({ data: [{ gender: 'F' }] });
      const questionsStore = useQuestionsStore();
      await questionsStore.FETCH_PERSONAL_INFO();

      expect(questionsStore.personalInfo).toEqual([{ gender: 'F' }]);
    });
  });

  describe('FETCH_USERS', () => {
    it('fetchs data and stores it in constant', async () => {
      mockedAxiosGet.mockResolvedValue({ data: [{ id: 1 }] });
      const store = useQuestionsStore();
      await store.FETCH_USERS();

      expect(store.users).toEqual([{ id: 1 }]);
    });
  });
});

describe('getters', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    const questionsStore = useQuestionsStore();
    questionsStore.answers = [
      { id: 1, selectedAnswer: '4' },
      { id: 2, selectedAnswer: '-3' },
      { id: 3, selectedAnswer: '-3' },
      { id: 5, selectedAnswer: '4' }
    ];
  });

  describe('EXTRACT_MINUS_SCORE', () => {
    it('extracts minus answers', () => {
      const questionsStore = useQuestionsStore();

      expect(questionsStore.EXTRACT_MINUS_SCORE).toEqual([
        { id: 2, selectedAnswer: '-3' },
        { id: 3, selectedAnswer: '-3' }
      ]);
    });
  });

  describe('MINUS_SCORE', () => {
    it('calculates score from minus answers', () => {
      const questionsStore = useQuestionsStore();

      expect(questionsStore.MINUS_SCORE).toEqual(6);
    });
  });

  describe('EXTRACT_PLUS_SCORE', () => {
    it('extracts score from plus answers', () => {
      const questionsStore = useQuestionsStore();

      expect(questionsStore.EXTRACT_PLUS_SCORE).toEqual([
        { id: 1, selectedAnswer: '4' },
        { id: 5, selectedAnswer: '4' }
      ]);
    });
  });

  describe('PLUS_SCORE', () => {
    it('calculates score from plus answers', () => {
      const questionsStore = useQuestionsStore();

      expect(questionsStore.PLUS_SCORE).toEqual(8);
    });
  });

  describe('TOTAL_SCORE', () => {
    it('calculates total score', () => {
      const questionsStore = useQuestionsStore();

      expect(questionsStore.TOTAL_SCORE).toEqual(14);
    });
  });

  describe('USER_EMPATHY_LEVEL_MALE', () => {
    it('return empathy level for male', () => {
      const questionsStore = useQuestionsStore();
      expect(questionsStore.USER_EMPATHY_LEVEL_MALE).toEqual('low');

      // little cheating with selectedAnswers to make test easier
      questionsStore.answers = [{ id: 1, selectedAnswer: '15' }];
      expect(questionsStore.USER_EMPATHY_LEVEL_MALE).toEqual('average');

      questionsStore.answers = [{ id: 1, selectedAnswer: '31' }];
      expect(questionsStore.USER_EMPATHY_LEVEL_MALE).toEqual('high');

      questionsStore.answers = [{ id: 1, selectedAnswer: '47' }];
      expect(questionsStore.USER_EMPATHY_LEVEL_MALE).toEqual('very high');
    });
  });

  describe('USER_EMPATHY_LEVEL_FEMALE', () => {
    it('return empathy level for female', () => {
      const questionsStore = useQuestionsStore();
      expect(questionsStore.USER_EMPATHY_LEVEL_FEMALE).toEqual('low');

      questionsStore.answers = [{ id: 2, selectedAnswer: '-29' }];
      expect(questionsStore.USER_EMPATHY_LEVEL_FEMALE).toEqual('average');

      questionsStore.answers = [{ id: 2, selectedAnswer: '-59' }];
      expect(questionsStore.USER_EMPATHY_LEVEL_FEMALE).toEqual('high');

      questionsStore.answers = [{ id: 2, selectedAnswer: '-89' }];
      expect(questionsStore.USER_EMPATHY_LEVEL_FEMALE).toEqual('very high');
    });
  });

  describe('FILTERED_USERS', () => {
    it('filters users', () => {
      const questionsStore = useQuestionsStore();

      questionsStore.personalInfo = [
        { gender: 'female', empathyLevel: 'low', lookingFor: 'female', description: 'aa' }
      ];
      questionsStore.users = sampleUsers();

      expect(questionsStore.FILTERED_USERS).toEqual([
        {
          id: 1,
          firstName: 'Jacklyn',
          lastName: 'Lemke',
          age: 100,
          profileImg:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png',
          ownedEmphatyLevel: 'low',
          gender: 'female',
          lookingFor: 'female',
          empathyLevel: 'low',
          description: 'H'
        }
      ]);

      questionsStore.personalInfo = [
        { gender: 'male', empathyLevel: 'low', lookingFor: 'male', description: 'aa' }
      ];
      questionsStore.users = sampleUsers();

      expect(questionsStore.FILTERED_USERS).toEqual([
        {
          id: 2,
          firstName: 'Jacklyn2',
          lastName: 'Lemke2',
          age: 102,
          profileImg:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png',
          ownedEmphatyLevel: 'low',
          gender: 'male',
          lookingFor: 'male',
          empathyLevel: 'low',
          description: 'H'
        }
      ]);
    });
  });
});
