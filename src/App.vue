<template>
  <main-nav />
  <router-view />
  <main-footer v-if="!shouldShowFooter" />
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import MainNav from '@/components/navigation/MainNav.vue';
import MainFooter from './components/footer/MainFooter.vue';
import { computed } from 'vue';

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
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
