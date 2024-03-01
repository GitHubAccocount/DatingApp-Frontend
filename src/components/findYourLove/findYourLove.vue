<template>
  <!--
    <section v-if="userStore.isLoadingGlobal" class="mx-6">Looking for users</section>
  -->
  <loading-screen v-if="isLoading" />
  <section v-else class="mx-6">
    <div v-if="!questionsStore.personalInfoTestState" data-testid="find-your-love-before-form">
      <find-your-love-before-form></find-your-love-before-form>
    </div>
    <div v-else-if="matchedStore.matchedUsers.length > 0">
      <find-your-love-after-form></find-your-love-after-form>
    </div>
    <div v-else-if="matchedStore.matchedUsers.length == 0">
      <h2>Ops! It seems there is no match...</h2>
    </div>
  </section>
</template>

<script lang="ts" setup>
import findYourLoveBeforeForm from '@/components/findYourLove/findYourLoveBeforeForm.vue';
import findYourLoveAfterForm from '@/components/findYourLove/findYourLoveAfterForm.vue';
import { useQuestionsStore } from '@/stores/questions';
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/stores/user';
import { useMatchedUsersStore } from '@/stores/matchedUsers';
import LoadingScreen from '../Shared/LoadingScreen.vue';

const questionsStore = useQuestionsStore();

const matchedStore = useMatchedUsersStore();

const userStore = useUserStore();

// const matchedUsers = ref([]);

// const fetchMatchedUsers = async () => {
//   try {
//     const response = await axios.get('http://localhost:8000/api/matched-users');
//     matchedUsers.value = response.data;
//   } catch (error: any) {}
// };
const isLoading = ref(false);
onMounted(async () => {
  isLoading.value = true;
  try {
    console.log('state', questionsStore.personalInfoTestState);
    if (!questionsStore.personalInfoTestState) {
      await questionsStore.GET_PERSONAL_INFO_STATE();
    }
    if (matchedStore.matchedUsers.length == 0) {
      await matchedStore.FETCH_MATCHED_USERS();
      console.log('hello');
    }
  } finally {
    // userStore.isLoadingGlobal = false;
    isLoading.value = false;
  }
});

// const matchedUsers = computed(() => matchedStore.matchedUsers);
</script>
