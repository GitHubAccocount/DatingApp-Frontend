<template>
  <find-your-love-before-form
    v-if="personalInfo.length === 0 && answers.length === 0"
  ></find-your-love-before-form>
  <find-your-love-after-form v-else></find-your-love-after-form>
</template>

<script lang="ts" setup>
import findYourLoveBeforeForm from '@/components/findYourLove/findYourLoveBeforeForm.vue';
import findYourLoveAfterForm from '@/components/findYourLove/findYourLoveAfterForm.vue';
import { useQuestionsStore } from '@/stores/questions';

const useQuestions = useQuestionsStore();
const personalInfo = useQuestions.personalInfo;
const answers = useQuestions.answers;
</script>
