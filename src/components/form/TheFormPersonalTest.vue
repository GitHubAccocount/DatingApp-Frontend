<template>
  <form ref="form" @submit.prevent="Submit()" class="w-full">
    <h1 class="mb-2 text-3xl font-bold">Additional Information</h1>
    <p class="text-lg">
      Say something more about yourself, so we can find
      <span class="font-bold">better match</span>!
    </p>

    <p class="mt-5 font-bold">Choose your gender:</p>

    <span v-if="errors?.gender" class="block text-red-600">{{ errors.gender[0] }}</span>

    <div class="w-full p-1">
      <input type="radio" id="female" v-model="gender" value="female" class="accent-red-400" />
      <label for="female" class="cursor-pointer pl-2">Female</label>
    </div>
    <div class="w-full p-1">
      <input
        type="radio"
        id="male"
        v-model="gender"
        value="male"
        class="accent-red-400"
        data-testid="firstMale"
      />
      <label for="male" class="cursor-pointer pl-2">Male</label>
    </div>

    <p class="mt-2 font-bold">Who are you looking for:</p>

    <span v-if="errors?.lookingFor" class="block text-red-600">{{ errors.lookingFor[0] }}</span>

    <div class="w-full p-1">
      <input
        type="radio"
        id="lookingForFemale"
        v-model="lookingFor"
        value="female"
        class="accent-red-400"
        data-testid="secondFemale"
      />
      <label for="lookingForFemale" class="cursor-pointer pl-2">Female</label>
    </div>
    <div class="w-full p-1">
      <input
        type="radio"
        id="lookingForMale"
        v-model="lookingFor"
        value="male"
        class="accent-red-400"
      />
      <label for="lookingForMale" class="cursor-pointer pl-2">Male</label>
    </div>

    <div class="relative">
      <p class="mt-2 inline font-bold">
        What level of empathy do you expect from the person you are looking for:
      </p>

      <div class="group relative inline-block">
        <p
          class="absolute bottom-1 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border border-rose-300 bg-rose-300 text-xs font-bold text-white"
        >
          i
        </p>
        <div
          class="hidden h-60 w-56 rounded-md border border-rose-300 bg-rose-300 p-4 group-hover:absolute group-hover:-left-24 group-hover:top-0 group-hover:block"
        >
          <p class="text-sm">
            Average empathy level is different for man and woman. From the test you have just solved
            the avarage man gets about 23 points, when avarage woman gets 44. That means when you
            are lookig for man, 'Average level of empathy' means about 23 points. When looking for
            woman the same level means about 44 points.
          </p>
        </div>
      </div>
    </div>

    <span v-if="errors?.empathyLevel" class="block text-red-600">{{ errors.empathyLevel[0] }}</span>

    <div v-for="choose in empathyLevelChoose" class="w-full p-1">
      <input
        :type="choose.type"
        :id="choose.id"
        v-model="choose.vmodel"
        :value="choose.value"
        :class="choose.class"
      />
      <label :for="choose.for" class="cursor-pointer pl-2">{{ choose.text }}</label>
    </div>

    <div class="w-full">
      <p class="mt-2 font-bold">
        Write a few words about yourself. It will help you to find
        <span class="text-red-400">the person just like you!</span>
      </p>
      <textarea
        data-testid="textarea"
        v-model="description"
        placeholder="Who are you? What hobbies do you have? Do you like books? Or maybe sports?"
        class="h-32 w-full rounded-md p-1 focus:outline-red-400"
      ></textarea>
    </div>

    <div class="flex w-full justify-center pb-6 pt-3">
      <custom-button type="submit" text="Submit" :loading="questionStore.isLoading"></custom-button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import CustomButton from '../Shared/CustomButton.vue';
import { useQuestionsStore } from '@/stores/questions';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { fromJSON } from 'postcss';

interface FormData {
  gender?: string;
  empathyLevel?: string;
  lookingFor?: string;
  description?: string;
}

const gender = ref('');
const empathyLevel = ref('');
const lookingFor = ref('');
const description = ref('');

const empathyLevelChoose = ref([
  {
    type: 'radio',
    id: 'low',
    vmodel: empathyLevel,
    value: 'low',
    for: 'low',
    text: 'Low level of empathy',
    class: 'accent-red-400'
  },
  {
    type: 'radio',
    id: 'average',
    vmodel: empathyLevel,
    value: 'average',
    for: 'average',
    text: 'Average level of empathy',
    class: 'accent-red-400'
  },
  {
    type: 'radio',
    id: 'high',
    vmodel: empathyLevel,
    value: 'high',
    for: 'high',
    text: 'High level of empathy',
    class: 'accent-red-400'
  },
  {
    type: 'radio',
    id: 'very high',
    vmodel: empathyLevel,
    value: 'very high',
    for: 'very high',
    text: 'Very high level of empathy',
    class: 'accent-red-400'
  }
]);

const formData = computed<FormData>(() => {
  return {
    gender: gender.value,
    empathyLevel: empathyLevel.value,
    lookingFor: lookingFor.value,
    description: description.value
  };
});

// const checkValue = () => {
//   let checker = true;
//   formData.value.forEach((data: object) => {
//     const answers = Object.values(data);
//     console.log(answers);
//     if (answers[0] === '') {
//       checker = false;
//     }
//   });

//   return checker;
// };

const form = ref<HTMLFormElement | null>(null);

const questionStore = useQuestionsStore();

const errors = computed(() => questionStore.personalInformationErrors);

const Submit = () => {
  questionStore.SUBMIT_PERSONAL_INFORMATION(formData.value, form.value);
};

// function Submit() {
//   // const baseUrl = import.meta.env.VITE_APP_API_URL;
//   // const url = `${baseUrl}/personalInfo`;
//   const url = 'http://localhost:8000/api/personal-informations';
//   axios.get('http://localhost:8000/sanctum/csrf-cookie');
//   axios
//     .post(url, formData.value)
//     .then((resp) => {
//       console.log(resp.data);
//       router.push({ path: '/find' });
//     })
//     .catch((error) => {
//       if (error.response.status == 422) {
//         errors.value = error.response.data.errors;
//         form.value?.scrollIntoView({ behavior: 'smooth' });
//       }
//     });
// }

onUnmounted(() => {
  questionStore.personalInformationErrors = {};
});
</script>
