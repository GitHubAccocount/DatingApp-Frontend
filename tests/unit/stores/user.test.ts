import { setActivePinia, createPinia } from 'pinia';
import { useUserStore } from '@/stores/user';

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
});
