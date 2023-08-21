<template>
  <section>
    <div class="grid grid-cols-2 gap-4 pb-5" ref="scrollComponent">
      <div
        v-for="user in usersOnScroll"
        :key="user.id"
        class="rounded-md border border-red-400 shadow-md"
      >
        <router-link :to="'/find/' + user.id">
          <div>
            <img :src="user.profileImg" />
          </div>
          <div class="bg-red-400 p-2 font-bold text-white">
            <p class="inline pr-1">{{ user.firstName }},</p>
            <p class="inline">{{ user.age }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useQuestionsStore } from '@/stores/questions';
import { computed, onMounted, onUnmounted, ref } from 'vue';

const questionsStore = useQuestionsStore();
onMounted(questionsStore.FETCH_USERS);

const users = computed(() => {
  return questionsStore.users;
});

onMounted(questionsStore.FETCH_PERSONAL_INFO);

const personalInfo = computed(() => {
  return questionsStore.personalInfo;
});

const scrollComponent = ref<HTMLElement | null>(null);
let start = 0;
let end = 10;
const usersOnScroll = ref(users.value.slice(start, end));

const loadMoreUsers = () => {
  start += 10;
  end += 10;
  let newUsersOnScroll = users.value.slice(start, end);
  usersOnScroll.value.push(...newUsersOnScroll);
};

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
