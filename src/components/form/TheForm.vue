<template>
  <section class="px-6">
    <form class="h-svh80 rounded-md border bg-red-100 p-6 shadow-md shadow-gray-700">
      <h1 class="mb-2 text-3xl font-bold">Empathy Test</h1>
      <p class="text-lg">
        Answer to each stentance using the scale from <span class="font-bold">+4</span> (<span
          class="font-bold"
          >very strong agreement</span
        >) to <span class="font-bold">-4</span> (<span class="font-bold"
          >very stong disagreement</span
        >).
      </p>
      <ol class="list-decimal">
        <li v-for="question in questions" :key="question.id" class="list-inside p-2">
          <label :for="question.id.toString()" class="pb-2 pr-2 md:border-b md:border-b-gray-400">{{
            question.text
          }}</label>
          <select
            :id="question.id.toString()"
            class="rounded-md border p-1 ring-1 focus:border-red-400 focus:outline-red-400 focus:ring-red-400"
          >
            <option
              v-for="number in numbers"
              :value="number.answer"
              :key="number.answer"
              :selected="number.selected"
            >
              {{ number.answer }}
            </option>
          </select>
        </li>
      </ol>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { useQuestionsStore } from '@/stores/questions';
import { computed, onMounted, ref } from 'vue';

const questionsStore = useQuestionsStore();
onMounted(questionsStore.FETCH_QUESTIONS);

const questions = computed(() => {
  return questionsStore.questions;
});

const numbers = ref([
  { answer: 'select answer', selected: true },
  { answer: -4, selected: false },
  { answer: -3, selected: false },
  { answer: -2, selected: false },
  { answer: -1, selected: false },
  { answer: 0, selected: false },
  { answer: 1, selected: false },
  { answer: 2, selected: false },
  { answer: 3, selected: false },
  { answer: 4, selected: false }
]);
</script>
