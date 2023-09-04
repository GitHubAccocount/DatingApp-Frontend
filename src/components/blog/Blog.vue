<template>
  <section class="mx-12 mb-5">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-x-20 lg:gap-y-10">
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
import { computed, onMounted } from 'vue';

const blogStore = useBlogStore();
onMounted(blogStore.FETCH_BLOGS);

const blogs = computed(() => {
  return blogStore.blogs;
});
</script>
