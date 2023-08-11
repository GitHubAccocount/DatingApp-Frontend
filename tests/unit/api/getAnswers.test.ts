import getAnswers from '@/api/getAnswers';
import axios from 'axios';
import type { Mock } from 'vitest';

vi.mock('axios');
const axiosGetMock = axios.get as Mock;

describe('getAnswers', () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({ data: [{ id: 1, selectedAnswer: '4' }] });
  });

  it('calls axios get request', async () => {
    await getAnswers();
    expect(axios.get).toHaveBeenCalledWith('http://myfakeapi.com/answers');
  });

  it('fetch answers from server', async () => {
    const answers = await getAnswers();
    expect(answers).toEqual([{ id: 1, selectedAnswer: '4' }]);
  });
});
