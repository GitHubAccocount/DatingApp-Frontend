<template>
  <form @submit.prevent="Submit" class="w-full">
    <h1 class="mb-2 text-3xl font-bold">Empathy Test</h1>
    <p class="text-lg">
      Answer to each stentance using the scale from <span class="font-bold">+4</span> (<span
        class="font-bold"
        >very strong agreement</span
      >) to <span class="font-bold">-4</span> (<span class="font-bold">very stong disagreement</span
      >).
    </p>
    <ol>
      <li v-for="question in questions" :key="question.id" class="py-2">
        <label :for="question.id.toString()" class="pb-2 pr-2" role="labelname">
          {{ question.id }}. {{ question.text }}</label
        >
        <select
          :id="question.id.toString()"
          class="rounded-md border p-1 ring-1 focus:border-red-400 focus:outline-red-400 focus:ring-red-400"
          @change="
            formData();
            checkValue();
          "
        >
          <option
            v-for="number in numbers"
            :value="number.answer"
            :key="number.answer"
            :selected="number.selected"
            :disabled="number.disabled"
          >
            {{ number.answer }}
          </option>
        </select>
      </li>
    </ol>
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

const questionsStore = useQuestionsStore();
onMounted(questionsStore.FETCH_QUESTIONS);

const questions = computed(() => {
  return questionsStore.questions;
});

const numbers = ref([
  { answer: 'select answer', selected: true, disabled: true },
  { answer: -4, selected: false, disabled: false },
  { answer: -3, selected: false, disabled: false },
  { answer: -2, selected: false, disabled: false },
  { answer: -1, selected: false, disabled: false },
  { answer: 0, selected: false, disabled: false },
  { answer: 1, selected: false, disabled: false },
  { answer: 2, selected: false, disabled: false },
  { answer: 3, selected: false, disabled: false },
  { answer: 4, selected: false, disabled: false }
]);

function formData() {
  const formData: { id: number; selectedAnswer: string }[] = [];
  questions.value.forEach((question) => {
    const selectedQuestion = document.getElementById(question.id.toString()) as HTMLSelectElement;
    if (selectedQuestion.value != 'select answer') {
      formData.push({
        id: question.id,
        selectedAnswer: selectedQuestion.value
      });
    }
  });
  return formData;
}

function checkValue() {
  const checkValue = [];
  questions.value.forEach((question) => {
    const selectedQuestion = document.getElementById(question.id.toString()) as HTMLSelectElement;
    if (selectedQuestion.value === 'select answer') {
      checkValue.push('checker');
    }
  });
  return checkValue.length === 0;
}

function Submit() {
  if (checkValue()) {
    const baseUrl = import.meta.env.VITE_APP_API_URL;
    const url = `${baseUrl}/answers`;
    axios
      .post(url, formData())
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    alert('Please, answer all questions :)');
  }
}

defineExpose({ Submit });
</script>
