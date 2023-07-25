import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const showNav = ref(false);
  const SHOW_NAV = (): boolean => {
    return (showNav.value = !showNav.value);
  };

  return { showNav, SHOW_NAV };
});
