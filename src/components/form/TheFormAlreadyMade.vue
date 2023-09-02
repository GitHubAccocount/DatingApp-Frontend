<template>
  <div class="flex w-full flex-col items-center">
    <h1 class="pb-3 text-center text-3xl font-bold">
      It seems that the test has already been done
    </h1>
    <p class="py-3 text-center text-lg">
      If you would like to do it one more time, please press
      <span class="font-bold">'I want to repeat the test'</span>
    </p>
    <custom-button text="I want to repeat the test" @click="restartData"></custom-button>
    <div
      v-if="displayLoadingMessage"
      class="absolute flex w-fit justify-center rounded-md border bg-white p-3"
    >
      <p class="text-xl">Reseting data...</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import CustomButton from '@/components/Shared/CustomButton.vue';
import { ref } from 'vue';

let displayLoadingMessage = ref(false);

function restartData() {
  displayLoadingMessage.value = true;
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const urlAnswers = `${baseUrl}/answers`;
  const urlpersonalInfo = `${baseUrl}/personalInfo`;
  axios
    .post(urlAnswers, {})
    .then((resp) => {
      console.log(resp.data);
    })
    .catch((error) => {
      console.log(error);
    });
  axios
    .post(urlpersonalInfo, {})
    .then((resp) => {
      console.log(resp.data);
    })
    .catch((error) => {
      console.log(error);
    });
  setTimeout(() => {
    window.location.reload();
  }, 1000);
}

defineExpose({ restartData });
</script>
