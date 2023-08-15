<template>
  <section
    class="mx-6 flex h-svh80 overflow-y-scroll rounded-md border bg-red-100 p-6 shadow-md shadow-gray-700"
  >
    <the-form-personal-already-made
      v-if="answers.length === 0 || personalInfo.length > 0"
    ></the-form-personal-already-made>
    <the-form-personal-test v-else></the-form-personal-test>
  </section>
</template>

<script lang="ts" setup>
import TheFormPersonalTest from './TheFormPersonalTest.vue';
import TheFormPersonalAlreadyMade from './TheFormPersonalAlreadyMade.vue';
import { useQuestionsStore } from '@/stores/questions';

const useQuestions = useQuestionsStore();
const personalInfo = useQuestions.personalInfo;
const answers = useQuestions.answers;
</script>
