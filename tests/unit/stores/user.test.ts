import { setActivePinia, createPinia } from 'pinia';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import type { Mock } from 'vitest';

vi.mock('axios');
const axiosGetMock = axios.get as Mock;

describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('stores information whether show navbar or not', () => {
    const store = useUserStore();
    expect(store.showNav).toBe(false);
  });
});

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('SHOW_NAV', () => {
    it('shows navbar', () => {
      const store = useUserStore();
      store.SHOW_NAV();
      expect(store.showNav).toBe(true);
    });

    it('hides navbar', () => {
      const store = useUserStore();
      store.showNav = true;
      store.SHOW_NAV();
      expect(store.showNav).toBe(false);
    });
  });

  describe('FETCH_USERS', () => {
    it('fetchs data and stores it in constant', async () => {
      axiosGetMock.mockResolvedValue({ data: [{ id: 1 }] });
      const store = useUserStore();
      await store.FETCH_USERS();

      expect(store.users).toEqual([{ id: 1 }]);
    });
  });
});
