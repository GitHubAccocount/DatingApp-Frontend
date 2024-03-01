import { computed, reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import type { Users } from '@/api/types';

export const useMatchedUsersStore = defineStore('matchedUsers', () => {
  const isLoading = ref(false);

  const matchedUsers = ref<Users[]>([]);

  const FETCH_MATCHED_USERS = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/matched-users');
      matchedUsers.value = response.data;
    } catch (error: any) {
      console.log(error);
    } finally {
    }
  };

  const formattedAges = computed(() => {
    return matchedUsers.value.map((user: any) => {
      const now = new Date();
      const diffInYears = Math.floor(
        (Number(now) - Number(new Date(user.birthday))) / (1000 * 60 * 60 * 24 * 365)
      );
      console.log(diffInYears);
      return diffInYears;
    });
  });

  // Filter current user for SingleUser.vue
  // const currentUser = computed((id) => {
  //   return users.value.find((user) => {
  //     return user.id === id;
  //   });
  // });

  const CURRENT_USER = (id: any) => {
    const user = matchedUsers.value.find((user) => user.id === id);
    return user;
  };

  return {
    formattedAges,
    matchedUsers,
    isLoading,
    CURRENT_USER,
    FETCH_MATCHED_USERS
  };
});
