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

    it('show and hides navbar', () => {
      const store = useUserStore();
      store.showNav = true;
      store.SHOW_NAV();
      expect(store.showNav).toBe(false);
    });
  });

  describe('SHOW_FILTER', () => {
    it('hides and show navabr', () => {
      const store = useUserStore();
      store.showFilter = false;
      store.SHOW_FILTER();
      expect(store.showFilter).toBe(true);
    });
  });

  describe('SELECT_AGE', () => {
    it('fills selectedAge with data', () => {
      const store = useUserStore();
      store.SELECT_AGE(['Adulthood']);
      expect(store.selectedAge).toEqual(['Adulthood']);
    });
  });

  describe('CLEAR_SELECTION', () => {
    it('clears selectedAge', () => {
      const store = useUserStore();
      store.selectedAge = ['Adulthood'];
      store.CLEAR_SELECTION();
      expect(store.selectedAge).toEqual([]);
    });
  });
});
