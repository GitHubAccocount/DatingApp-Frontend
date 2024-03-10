<template>
  <section>
    <div>
      <find-your-love-filter></find-your-love-filter>
    </div>
    <loading-message v-if="loadingUsers" class="loading-message-80"></loading-message>
    <div
      v-if="!loadingUsers"
      class="grid grid-cols-2 gap-4 pb-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      ref="scrollComponent"
    >
      <div
        v-for="(user, index) in usersOnScroll"
        :key="user.user_id"
        class="rounded-md border border-red-400 shadow-md"
      >
        <router-link :to="'/find/' + user.id">
          <div>
            <img class="rounded-t-md" :src="user.profile_picture" alt="user photo" />
          </div>
          <div class="bg-red-400 p-2 font-bold text-white">
            <p class="inline pr-1">{{ user.name }},</p>
            <p class="inline">{{ formattedAges[index] }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useQuestionsStore } from '@/stores/questions';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import findYourLoveFilter from '@/components/findYourLove/findYourLoveFilter/findYourLoveFilter.vue';
import LoadingMessage from '@/components/Shared/LoadingMessage.vue';
import axios from 'axios';
import { useMatchedUsersStore } from '@/stores/matchedUsers';
import type { Users } from '@/api/types';

const questionsStore = useQuestionsStore();
const loadingUsers = ref(false);

const matchedStore = useMatchedUsersStore();
const matchedUsers = matchedStore.matchedUsers;
console.log(matchedUsers);

const formattedAges = matchedStore.formattedAges;

const scrollComponent = ref<HTMLElement | null>(null);
let start = 0;
let end = 10;
const usersOnScroll = ref<Users[]>(matchedUsers.slice(start, end));
console.log(usersOnScroll.value);

const loadMoreUsers = () => {
  start += 10;
  end += 10;
  let newUsersOnScroll = matchedUsers.slice(start, end);
  usersOnScroll.value.push(...newUsersOnScroll);
};

// during test userOnScroll didn't update, watcher fix the problem with updating
watch(matchedUsers, (newUsers) => {
  usersOnScroll.value = newUsers.slice(start, end);
});

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const handleScroll = () => {
  const element = scrollComponent.value as HTMLElement;
  if (element.getBoundingClientRect().bottom <= window.innerHeight + 10) {
    loadMoreUsers();
  }
};
</script>
