import { defineStore } from 'pinia';
import getBlogs from '@/api/getBlogs';
import type { Blog } from '@/api/types';
import { ref } from 'vue';

export const useBlogStore = defineStore('blog', () => {
  const blogs = ref<Blog[]>([]);
  const FETCH_BLOGS = async () => {
    const fetchedBlogs = await getBlogs();
    blogs.value = fetchedBlogs;
  };

  return { blogs, FETCH_BLOGS };
});
