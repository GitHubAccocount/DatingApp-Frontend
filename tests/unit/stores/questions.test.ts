import { setActivePinia, createPinia } from 'pinia';
import { useQuestionsStore } from '@/stores/questions';
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
