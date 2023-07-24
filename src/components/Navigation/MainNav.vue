<template>
  <header class="sticky left-0 right-0 top-0 mb-8 h-16 shadow-lg 2xl:h-24">
    <nav class="flex h-full w-full items-center justify-between bg-white">
      <div class="flex h-full items-center">
        <div class="hidden pt-2 md:inline md:pl-6">
          <img class="h-auto w-full md:w-14" src="assets/date-app_logo2.png" />
        </div>
        <div class="w-10 justify-end pl-6 md:hidden">
          <font-awesome-icon :icon="inOutIcon" size="2xl" @click="SHOW_NAV"></font-awesome-icon>
        </div>
        <ul
          :class="[
            'absolute',
            'bg-white',
            'w-full',
            'duration-300',
            'ease-in-out',
            '-z-10',
            inOutNav,
            'md:static',
            'md:z-0',
            'md:flex',
            'md:justify-start',
            'md:pl-3',
            'md:h-full'
          ]"
        >
          <li
            v-for="item in menuItems"
            :key="item.text"
            :class="{ 'bg-red-400 text-rose-50': isCurrentRoute(item.url) }"
            class="flex border-b border-red-400 p-3 font-bold last:shadow-lg hover:bg-red-400 hover:text-rose-50 md:border-none md:p-0 md:text-lg md:last:shadow-none"
          >
            <router-link
              :to="item.url"
              class="block w-full md:flex md:h-full md:items-center md:p-3 2xl:text-2xl"
              >{{ item.text }}</router-link
            >
          </li>
        </ul>
        <div class="pl-6 pt-2 md:hidden">
          <img class="h-10 w-11 md:w-14" src="assets/date-app_logo2.png" />
        </div>
      </div>

      <div class="py-3 pr-6">
        <Button></Button>
      </div>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import Button from '@/components/Shared/Button.vue';

import type { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import { useUserStore } from '@/stores/user';

const menuItems = ref([
  { text: 'Home', url: '/', name: 'home' },
  { text: 'Find Your Love', url: '/find', name: 'find' },
  { text: 'Blog', url: '/blog', name: 'blog' }
]);

const userStore = useUserStore();
const showNav = computed(() => userStore.showNav);
const SHOW_NAV = userStore.SHOW_NAV;

// shows and hide navbar for mobile
const inOutNav = computed(() => {
  return showNav.value ? 'top-16' : '-top-48';
});

// shows xmark or hamburger
const inOutIcon = computed(() => {
  return ['fas', showNav.value ? 'xmark' : 'bars'];
});

const route = useRoute();
// instead of function it is possible to use .router-link-active and .router-link-exact-active
const isCurrentRoute = (url: string) => {
  return route.path === url;
};
</script>
