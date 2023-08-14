<template>
  <div class="flex w-full flex-col items-center">
    <h1 class="pb-3 text-center text-3xl font-bold">You can't access this page.</h1>
    <p class="py-3 text-center text-lg">
      If you would like to repeat the form, press <span class="font-bold"> the button below </span>.
      It will <span class="font-bold"> redirect </span>you to place where from you can restart your
      form.
    </p>
    <custom-button text="Redirect me" @click="redirect()"></custom-button>
  </div>
</template>

<script lang="ts" setup>
import CustomButton from '../Shared/CustomButton.vue';
import { useRouter } from 'vue-router';

const redirect = () => {
  const router = useRouter();
  router.push({ path: '/form' });
};
</script>
