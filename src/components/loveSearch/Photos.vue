<template>
  <img
    :src="photo"
    alt="Couple photos"
    class="} h-full w-full rounded-t-md object-cover shadow-sm shadow-gray-700 transition-opacity duration-500 ease-in"
  />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, ref } from 'vue';

const photo = ref<string>('assets/couple1v2.jpeg');
const currentIndex = ref<number>(0);

const changePhoto = () => {
  const photos = [
    'assets/couple1v2.jpeg',
    'assets/couple2v2.jpeg',
    'assets/couple3v2.jpeg',
    'assets/couple4v2.jpeg'
  ];
  currentIndex.value = (currentIndex.value + 1) % photos.length;
  photo.value = photos[currentIndex.value];
};

const intervalPhotos = setInterval(changePhoto, 5000);

onBeforeUnmount(() => clearInterval(intervalPhotos));
</script>

<style scoped>
img {
  opacity: 0;
  opacity: 100;
  transition: opacity 1s ease-in-out;
}
</style>
