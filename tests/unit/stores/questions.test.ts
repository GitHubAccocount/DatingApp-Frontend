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
});
