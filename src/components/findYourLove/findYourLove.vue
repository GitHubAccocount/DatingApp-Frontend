<template>
  <section class="mx-6">
    <find-your-love-after-form
      v-if="personalInfo.length > 0 && answers.length > 0"
    ></find-your-love-after-form>
    <find-your-love-before-form v-else></find-your-love-before-form>
  </section>
</template>

<script lang="ts" setup>
import findYourLoveBeforeForm from '@/components/findYourLove/findYourLoveBeforeForm.vue';
import findYourLoveAfterForm from '@/components/findYourLove/findYourLoveAfterForm.vue';
import { useQuestionsStore } from '@/stores/questions';
import { computed, onMounted } from 'vue';

const questionsStore = useQuestionsStore();

onMounted(questionsStore.FETCH_PERSONAL_INFO);
const personalInfo = computed(() => {
  return questionsStore.personalInfo;
});
onMounted(questionsStore.FETCH_ANSWERS);
const answers = computed(() => {
  return questionsStore.answers;
});

console.log('p: ', personalInfo.value.length, 'a: ', answers.value.length);
</script>
