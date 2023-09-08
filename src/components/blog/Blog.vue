<template>
  <section class="mx-6 mb-5 lg:mx-12">
    <div>
      <loading-message v-if="loading" class="loading-message-80"></loading-message>
    </div>
    <div v-if="!loading" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-x-20 lg:gap-y-10">
      <router-link
        v-for="blog in blogs"
        key:blog.id
        :to="'/blog/' + blog.id"
        class="cursor-pointer"
      >
        <figure class="relative mb-3 w-full overflow-hidden object-contain">
          <img
            :src="blog.img"
            alt="blog photo"
            class="transition-transform duration-300 ease-in-out hover:scale-110"
          />
          <h2 class="absolute bottom-0 left-0 p-3 text-xl font-bold text-gray-50">
            {{ blog.title }}
          </h2>
        </figure>
        <div class="p-2">
          <div class="mb-2">
            <p class="mb-3 font-bold text-red-400">{{ blog.date }}</p>
            <p>{{ blog.content1.substring(0, 120) }}...</p>
          </div>
          <div class="flex items-center">
            <p class="text-red-400">
              Read more <font-awesome-icon :icon="['fas', 'chevron-right']" class="pl-1" />
            </p>
          </div>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useBlogStore } from '@/stores/blog';
import LoadingMessage from '../Shared/LoadingMessage.vue';
import { computed, onMounted, ref } from 'vue';

const blogStore = useBlogStore();
const loading = ref(true);

onMounted(async () => {
  try {
    await blogStore.FETCH_BLOGS();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});

const blogs = computed(() => {
  return blogStore.blogs;
});
</script>
