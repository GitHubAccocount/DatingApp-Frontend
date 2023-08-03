import getQuestions from '@/api/getQuestions';
import axios from 'axios';

vi.mock('axios');
//vi.mocked - 'Type helper for TypeScript.'
const mockedAxiosGet = vi.mocked(axios.get);

describe('getQuestios', () => {
  beforeEach(() => {
    mockedAxiosGet.mockResolvedValue({ data: [{ text: 'sample text', id: 1 }] });
  });
  it('makes GET request to fetch questions', async () => {
    await getQuestions();
    expect(axios.get).toHaveBeenLastCalledWith('http://myfakeapi.com/questions');
  });
  it('extract questions from response', async () => {
    const questions = await getQuestions();
    expect(questions).toEqual([{ text: 'sample text', id: 1 }]);
  });
});
