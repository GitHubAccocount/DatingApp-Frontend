import getPersonalInfo from '@/api/getPersonalInfo';
import axios from 'axios';

import type { Mock } from 'vitest';
vi.mock('axios');
const axiosGetMock = axios.get as Mock;

describe('getPersonalInfo', () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({ data: [{ gender: 'F' }] });
  });
  it('fetch personalInfo from server', async () => {
    const baseUrl = import.meta.env.VITE_APP_API_URL;
    const url = `${baseUrl}/personalInfo`;
    const personalInfo = await getPersonalInfo();
    expect(personalInfo).toEqual([{ gender: 'F' }]);
  });
});
