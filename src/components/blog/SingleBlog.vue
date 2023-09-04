<template>
  <section class="mx-6 lg:mx-12">
    <div v-if="blog">
      <div class="rounded-md bg-gray-200 px-3 py-4">
        <h1 class="text-xl font-bold">{{ blog.title }}</h1>
      </div>
      <div class="mt-3">
        <p class="font-bold text-red-400">{{ blog.date }}</p>
      </div>

      <div v-for="n in 10" class="mb-3 mt-3 last:mb-10">
        <h2 class="text-lg font-bold text-gray-700">{{ (blog as any)['subtitle' + n] }}</h2>
        <p class="text-gray-500">{{ (blog as any)['content' + n] }}</p>
      </div>
    </div>
    <div v-else class="flex h-svh80 justify-center">
      <h1 class="text-2xl">Sorry. This page doesn't exists.</h1>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useBlogStore } from '@/stores/blog';

const route = useRoute();
const currentBlog = computed(() => {
  return Number(route.params.id);
});

const blogStore = useBlogStore();
onMounted(blogStore.FETCH_BLOGS);

const blog = computed(() => {
  return blogStore.blogs.find((blog) => blog.id === currentBlog.value);
});
</script>
