<template>
  <section class="mx-6">
    <div
      v-if="personalInfo.length > 0 && answers.length > 0"
      data-testid="find-your-love-after-form"
    >
      <find-your-love-after-form></find-your-love-after-form>
    </div>
    <div v-else data-testid="find-your-love-before-form">
      <find-your-love-before-form></find-your-love-before-form>
    </div>
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
</script>
