<template>
  <loading-message v-show="!isLoaded" class="loading-message-full"></loading-message>
  <img
    :src="photo"
    alt="Couple photos"
    class="h-full w-full rounded-md object-cover shadow-sm shadow-gray-700 lg:object-right xl:object-center"
    v-show="isLoaded"
    @load="loadImage"
  />
</template>

<script lang="ts" setup>
import LoadingMessage from '../Shared/LoadingMessage.vue';
import { onBeforeUnmount, ref } from 'vue';
import couple1 from '/assets/couple1v2.jpeg';
import couple2 from '/assets/couple2v2.jpeg';
import couple3 from '/assets/couple3v2.jpeg';
import couple4 from '/assets/couple4v2.jpeg';

const photo = ref<string>('assets/couple1v2.jpeg');
const currentIndex = ref<number>(0);

const couple1Path = ref(couple1);
const couple2Path = ref(couple2);
const couple3Path = ref(couple3);
const couple4Path = ref(couple4);

const changePhoto = () => {
  const photos = [couple1Path.value, couple2Path.value, couple3Path.value, couple4Path.value];
  currentIndex.value = (currentIndex.value + 1) % photos.length;
  photo.value = photos[currentIndex.value];
};

const intervalPhotos = setInterval(changePhoto, 5000);

onBeforeUnmount(() => clearInterval(intervalPhotos));

const isLoaded = ref(false);

const loadImage = () => {
  return (isLoaded.value = true);
};

defineExpose({ isLoaded });
</script>
