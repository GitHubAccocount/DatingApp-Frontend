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
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import CustomButton from '@/components/Shared/CustomButton.vue';

function restartData() {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const urlAnswers = `${baseUrl}/answers`;
  const urlpersonalInfo = `${baseUrl}/personalInfo`;
  axios
    .all([axios.post(urlAnswers, {}), axios.post(urlpersonalInfo, {})])
    .then(
      axios.spread((dataA, dataI) => {
        console.log('Answers', dataA, 'PersonalInfo', dataI);
      })
    )
    .catch((error) => {
      console.log(error);
    });
  window.location.reload();
}

defineExpose({ restartData });
</script>
