<template>
  <section
    class="mx-6 flex h-svh80 overflow-y-scroll rounded-md border bg-red-100 p-6 shadow-md shadow-gray-700"
  >
    <the-form-already-made v-if="answers.length > 0"></the-form-already-made>
    <the-form-empathy-test v-else></the-form-empathy-test>
  </section>
</template>

<script lang="ts" setup>
import TheFormEmpathyTest from '@/components/form/TheFormEmpathyTest.vue';
import TheFormAlreadyMade from './TheFormAlreadyMade.vue';
import { useQuestionsStore } from '@/stores/questions';
import { computed, onMounted, ref } from 'vue';

const questionsStore = useQuestionsStore();
const answers = questionsStore.answers;
</script>
