<template>
  <img
    :src="photo"
    alt="Couple photos"
    class="} h-full w-full rounded-t-md object-cover shadow-sm shadow-gray-700 transition-opacity duration-500 ease-in"
  />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, ref } from 'vue';

const photo = ref<string>('assets/couple1.jpg');
const currentIndex = ref<number>(0);

const changePhoto = () => {
  const photos = [
    'assets/couple1.jpg',
    'assets/couple2.jpg',
    'assets/couple3.jpg',
    'assets/couple4.jpg'
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
