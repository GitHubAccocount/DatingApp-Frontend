<template>
  <section v-if="currentUser" class="mx-6 lg:flex">
    <div class="flex justify-center">
      <img
        :src="currentUser?.profileImg"
        class="w-2/3 border border-gray-400 shadow-md md:w-1/2 lg:w-full"
        alt="user photo"
      />
    </div>
    <div class="mt-3 lg:m-0 lg:flex lg:flex-col lg:justify-between lg:px-10">
      <div>
        <div class="border-b border-gray-600">
          <p class="inline pr-1 text-xl font-bold md:text-2xl">{{ currentUser?.firstName }},</p>
          <p class="inline text-xl md:text-2xl">{{ currentUser?.age }}</p>
        </div>
        <div class="mt-2 border-b border-gray-600">
          <h3 class="text-xl font-bold md:text-2xl">About me:</h3>
          <p class="text-lg">{{ currentUser?.description }}</p>
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
</template>

<script lang="ts" setup>
import { useQuestionsStore } from '@/stores/questions';
import CustomButton from '@/components/Shared/CustomButton.vue';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const questionsStore = useQuestionsStore();
onMounted(questionsStore.FETCH_USERS);
onMounted(questionsStore.FETCH_PERSONAL_INFO);

const users = computed(() => {
  return questionsStore.FILTERED_USERS;
});

const route = useRoute();
const currentUserId = computed(() => Number(route.params.id));

const currentUser = computed(() => {
  return users.value.find((user) => {
    return user.id === currentUserId.value;
  });
});
</script>
