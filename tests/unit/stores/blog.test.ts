import { useBlogStore } from '@/stores/blog';
import type { Mock } from 'vitest';

import axios from 'axios';
import getBlogs from '@/api/getBlogs';
import { createPinia, setActivePinia } from 'pinia';
vi.mock('axios');
const axiosGetMock = axios.get as Mock;

describe('useBlogStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
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
  describe('actions', () => {
    describe('FETCH_BLOGS', () => {
      it('fills blogs constant with data from server', async () => {
        await getBlogs();
        const blogStore = useBlogStore();
        await blogStore.FETCH_BLOGS();
        expect(blogStore.blogs).toEqual([
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
  });
});
