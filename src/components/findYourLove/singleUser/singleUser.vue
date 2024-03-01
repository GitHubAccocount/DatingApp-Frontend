<template>
  <loading-screen v-if="isLoading" />
  <div v-else>
    <section v-if="currentUser" class="mx-6 lg:flex">
      <div class="flex justify-center">
        <img
          :src="currentUser?.profile_picture"
          class="w-2/3 border border-gray-400 shadow-md md:w-1/2 lg:w-full"
          alt="user photo"
        />
      </div>
      <div class="mt-3 lg:m-0 lg:flex lg:flex-col lg:justify-between lg:px-10">
        <div>
          <div class="border-b border-gray-600">
            <p class="inline pr-1 text-xl font-bold md:text-2xl">{{ currentUser?.name }},</p>
            <p class="inline text-xl md:text-2xl">{{ formattedAge }}</p>
          </div>
          <div class="mt-2 border-b border-gray-600">
            <h3 class="text-xl font-bold md:text-2xl">About me:</h3>
            <p class="text-lg">{{ currentUser?.personal_information[0].description }}</p>
          </div>
        </div>
        <div class="mt-3 flex justify-center">
          <custom-button text="Start Chat" :icon="['fas', 'message']"></custom-button>
        </div>
      </div>
    </section>
    <section v-else>
      <h1 class="text-center text-2xl">Sorry. This page doesn't exist.</h1>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { useQuestionsStore } from '@/stores/questions';
import CustomButton from '@/components/Shared/CustomButton.vue';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useMatchedUsersStore } from '@/stores/matchedUsers';
import type { User, Users } from '@/api/types';

const matchedStore = useMatchedUsersStore();
// onMounted(questionsStore.FETCH_USERS);
// onMounted(questionsStore.FETCH_PERSONAL_INFO);

const currentUserId = computed(() => Number(route.params.id));
const currentUser = ref<Users>();
const isLoading = ref(false);
onMounted(async () => {
  isLoading.value = true;
  if (!matchedStore.CURRENT_USER(currentUserId.value))
    try {
      await matchedStore.FETCH_MATCHED_USERS();
      const currentUser = computed(() => {
        return matchedStore.matchedUsers.find((user) => {
          return user.id === currentUserId.value;
        });
      });
    } finally {
      isLoading.value = false;
    }
  currentUser.value = matchedStore.CURRENT_USER(currentUserId.value);
  isLoading.value = false;
});

// const users = computed(() => {
//   return matchedStore.matchedUsers;
// });

const route = useRoute();

// const currentUser = computed(() => {
//   return users.value.find((user) => {
//     return user.id === currentUserId.value;
//   });
// });

const formattedAge = computed(() => {
  if (currentUser.value) {
    const now = new Date();
    const diffInYears = Math.floor(
      (Number(now) - Number(new Date(currentUser.value.birthday))) / (1000 * 60 * 60 * 24 * 365)
    );
    return diffInYears;
  }
});
</script>
