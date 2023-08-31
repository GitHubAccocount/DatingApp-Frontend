import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const showNav = ref(false);
  const SHOW_NAV = (): boolean => {
    return (showNav.value = !showNav.value);
  };

  const showFilter = ref(false);
  const SHOW_FILTER = (): boolean => {
    return (showFilter.value = !showFilter.value);
  };

  const selectedAge = ref<string[]>([]);
  const SELECT_AGE = (ages: string[]) => {
    selectedAge.value = ages;
  };

  const CLEAR_SELECTION = () => {
    selectedAge.value = [];
  };

  return { showNav, showFilter, selectedAge, SHOW_NAV, SHOW_FILTER, SELECT_AGE, CLEAR_SELECTION };
});
