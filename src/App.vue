<template>
  <main-nav />
  <loading-screen v-if="userStore.isLoadingGlobal" />
  <router-view v-else />
  <main-footer v-if="!shouldShowFooter" />
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import MainNav from '@/components/navigation/MainNav.vue';
import MainFooter from './components/footer/MainFooter.vue';
import { computed, defineAsyncComponent, onMounted } from 'vue';
import { useUserStore } from './stores/user';
import LoadingScreen from './components/Shared/LoadingScreen.vue';

const HomeView = defineAsyncComponent(() => import('@/views/HomeView.vue'));
const FindView = defineAsyncComponent(() => import('@/views/FindView.vue'));
const BlogView = defineAsyncComponent(() => import('@/views/BlogView.vue'));
const PersonalView = defineAsyncComponent(
  () => import('@/components/findYourLove/findYourLoveBeforeForm.vue')
);
// const findYourLove = defineAsyncComponent(() => import('@/views/FindView.vue'));
// const FindView = defineAsyncComponent(() => import('@/views/FindView.vue'));

const route = useRoute();
// Function to check if the path matches the pattern "/find", "/form", or "/find/1", "/find/2", etc.
const pathMatchesPattern = (path: string): boolean => {
  const pattern = /^(\/find\/\d+|\/form\/\d+|\/find$|\/form$|\/form)/;
  return pattern.test(path);
};

const shouldShowFooter = computed(() => {
  const path = route.path;
  return pathMatchesPattern(path);
});

// onMounted(async () => {
//   const userStore = useUserStore();
//   await userStore.GET_USER().catch((error) => {
//     console.error('Error fetching user:', error);
//   });
// });

const userStore = useUserStore();

// onMounted(() => {
//   console.log('e');
//   // to connect the public channel
//   window.Echo.channel('public').listen('Hello', (e: any) => {
//     console.log('go public');
//     //code for displaying the serve data
//     console.log(e); // the data from the server
//   });
// });
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
