import getBlogs from '@/api/getBlogs';
import type { Mock } from 'vitest';

import axios from 'axios';
vi.mock('axios');
const axiosGetMock = axios.get as Mock;

describe('getBlogs', () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          id: 1,
          title: 'Example',
          date: 'Example',
          img: 'Example',
          subtitle1: 'Example',
          content1: 'Example',
          subtitle2: 'Example',
          content2: 'Example',
          subtitle3: 'Example',
          content3: 'Example',
          subtitle4: 'Example',
          content4: 'Example',
          subtitle5: 'Example',
          content5: 'Example',
          subtitle6: 'Example',
          content6: 'Example',
          subtitle7: 'Example',
          content7: 'Example'
        }
      ]
    });
  });
  it('calls axios get request', async () => {
    const baseUrl = import.meta.env.VITE_APP_API_URL;
    const url = `${baseUrl}/blogs`;
    await getBlogs();
    expect(axios.get).toHaveBeenCalledWith(url);
  });

  it('fetch answers from server', async () => {
    const blogs = await getBlogs();
    expect(blogs).toEqual([
      {
        id: 1,
        title: 'Example',
        date: 'Example',
        img: 'Example',
        subtitle1: 'Example',
        content1: 'Example',
        subtitle2: 'Example',
        content2: 'Example',
        subtitle3: 'Example',
        content3: 'Example',
        subtitle4: 'Example',
        content4: 'Example',
        subtitle5: 'Example',
        content5: 'Example',
        subtitle6: 'Example',
        content6: 'Example',
        subtitle7: 'Example',
        content7: 'Example'
      }
    ]);
  });
});
