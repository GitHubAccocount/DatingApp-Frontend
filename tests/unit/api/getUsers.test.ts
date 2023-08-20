import getUsers from '@/api/getUsers';
import axios from 'axios';
import type { Mock } from 'vitest';

vi.mock('axios');
const axiosGetMock = axios.get as Mock;

describe('getUsers', () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          id: 1,
          firstName: 'Jacklyn',
          lastName: 'Lemke',
          age: 100,
          profileImg: 'https://fakePhoto',
          ownedEmphatyLevel: 'high',
          gender: 'Female',
          lookingFor: 'female',
          empathyLevel: 'very high',
          description: 'Handcrafted'
        }
      ]
    });
  });

  it('fetch users from server', async () => {
    const data = await getUsers();
    expect(data).toEqual([
      {
        id: 1,
        firstName: 'Jacklyn',
        lastName: 'Lemke',
        age: 100,
        profileImg: 'https://fakePhoto',
        ownedEmphatyLevel: 'high',
        gender: 'Female',
        lookingFor: 'female',
        empathyLevel: 'very high',
        description: 'Handcrafted'
      }
    ]);
  });
});
