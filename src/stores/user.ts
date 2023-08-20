import { ref } from 'vue';
import { defineStore } from 'pinia';
import getUsers from '@/api/getUsers';
import type { User } from '@/api/types';

export const useUserStore = defineStore('user', () => {
  const showNav = ref(false);
  const SHOW_NAV = (): boolean => {
    return (showNav.value = !showNav.value);
  };

  const users = ref<User[]>([]);
  const FETCH_USERS = async () => {
    const fetchUsers = await getUsers();
    users.value = fetchUsers;
  };

  return { showNav, users, SHOW_NAV, FETCH_USERS };
});
