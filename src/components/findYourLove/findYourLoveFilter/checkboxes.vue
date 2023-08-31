<template>
  <div class="mt-2">
    <fieldset>
      <ul>
        <li v-for="age in allAges" :key="age.id" class="pt-1">
          <input
            :id="age.id"
            type="checkbox"
            :value="age.id"
            class="mr-2"
            v-model="selectedAge"
            @change="selectAge"
          />
          <label :for="age.id" class="text-lg">{{ age.value }}</label>
        </li>
      </ul>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
import { useQuestionsStore } from '@/stores/questions';
import { useUserStore } from '@/stores/user';
import { onUnmounted, ref } from 'vue';

const questionsStore = useQuestionsStore();
const allAges = questionsStore.allAge;

const userStore = useUserStore();

const selectedAge = ref<string[]>([]);
const selectAge = () => {
  userStore.SELECT_AGE(selectedAge.value);
  console.log(selectedAge.value);
};

onUnmounted(() => {
  userStore.CLEAR_SELECTION();
  userStore.$onAction(({ after, name }) => {
    after(() => {
      if (name === 'CLEAR_SELECTION') {
        selectedAge.value = [];
      }
    });
  });
});
</script>
