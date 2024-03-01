<template>
  <section
    class="mx-6 flex h-svh80 overflow-y-scroll rounded-md border bg-red-100 p-6 shadow-md shadow-gray-700"
  >
    <div>
      <!--  <the-form-personal-already-made
        v-if="!isAnswersEmpty || personalInfo.length > 0"
      ></the-form-personal-already-made>
      -->
      <the-form-personal-test></the-form-personal-test>
    </div>
  </section>
</template>

<script lang="ts" setup>
import TheFormPersonalTest from './TheFormPersonalTest.vue';
import TheFormPersonalAlreadyMade from './TheFormPersonalAlreadyMade.vue';
import LoadingMessage from '../Shared/LoadingMessage.vue';
import { useQuestionsStore } from '@/stores/questions';
import { computed, onMounted, ref } from 'vue';

const questionsStore = useQuestionsStore();
const loadingPersonalInfo = ref(true);

// onMounted(async () => {
//   try {
//     await questionsStore.FETCH_PERSONAL_INFO();
//   } catch (error) {
//     console.error(error);
//   } finally {
//     loadingPersonalInfo.value = false;
//   }
// });

// const personalInfo = computed(() => {
//   return questionsStore.personalInfo;
// });

// const loadingAnswers = ref(true);

// onMounted(async () => {
//   try {
//     await questionsStore.FETCH_ANSWERS();
//   } catch (error) {
//     console.error(error);
//   } finally {
//     loadingAnswers.value = false;
//   }
// });

// const answers = computed(() => {
//   return questionsStore.answers;
// });

// const isAnswersEmpty = computed(() => {
//   for (let key in answers.value) {
//     if (answers.value.hasOwnProperty(key)) {
//       return true;
//     } else {
//       return false;
//     }
//   }
// });
</script>
