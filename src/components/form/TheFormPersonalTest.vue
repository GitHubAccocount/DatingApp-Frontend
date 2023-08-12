<template>
  <form @submit.prevent="" class="w-full">
    <h1 class="mb-2 text-3xl font-bold">Additional Information</h1>
    <p class="text-lg">
      Say something more about yourself, so we can find
      <span class="font-bold">better match</span>!
    </p>

    <p class="mt-5">Choose your gender:</p>
    <div class="w-full p-1">
      <input type="radio" id="female" v-model="gender" value="female" />
      <label for="female" class="cursor-pointer">Female</label>
    </div>
    <div class="w-full p-1">
      <input type="radio" id="male" v-model="gender" value="male" />
      <label for="male" class="cursor-pointer">Male</label>
    </div>

    <p class="mt-2">What level of empathy do you expect from the person you are looking for:</p>
    <div v-for="choose in empathyLevelChoose" class="w-full p-1">
      <input :type="choose.type" :id="choose.id" v-model="choose.vmodel" :value="choose.value" />
      <label :for="choose.for" class="cursor-pointer">{{ choose.text }}</label>
    </div>

    <div class="flex w-full justify-center pb-6 pt-3">
      <custom-button type="submit" text="Submit" class=""></custom-button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import CustomButton from '../Shared/CustomButton.vue';
import { useQuestionsStore } from '@/stores/questions';
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const gender = ref('');
const empathyLevel = ref('');

const empathyLevelChoose = ref([
  {
    type: 'radio',
    id: 'low',
    vmodel: empathyLevel,
    value: 'low',
    for: 'low',
    text: 'Low level of empathy'
  },
  {
    type: 'radio',
    id: 'average',
    vmodel: empathyLevel,
    value: 'average',
    for: 'average',
    text: 'Average level of empathy'
  },
  {
    type: 'radio',
    id: 'high',
    vmodel: empathyLevel,
    value: 'high',
    for: 'high',
    text: 'High level of empathy'
  },
  {
    type: 'radio',
    id: 'very high',
    vmodel: empathyLevel,
    value: 'very high',
    for: 'very high',
    text: 'Very high level of empathy'
  }
]);

// function checkValue() {
//   const checkValue = [];
//   questions.value.forEach((question) => {
//     const selectedQuestion = document.getElementById(question.id.toString()) as HTMLSelectElement;
//     if (selectedQuestion.value === 'select answer') {
//       checkValue.push('checker');
//     }
//   });
//   return checkValue.length === 0;
// }

// const router = useRouter();
// function Submit() {
//   if (checkValue()) {
//     const baseUrl = import.meta.env.VITE_APP_API_URL;
//     const url = `${baseUrl}/answers`;
//     axios
//       .post(url, )
//       .then((resp) => {
//         console.log(resp.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     alert('Form has been sent successfully!');
//     router.push({ path: 'form/2' });
//   } else {
//     alert('Please, answer all questions :)');
//   }
// }
</script>
