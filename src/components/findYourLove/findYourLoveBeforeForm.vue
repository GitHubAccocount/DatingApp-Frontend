<template>
  <section class="flex flex-col items-center">
    <h1 class="text-center text-3xl font-bold">
      On this page you can search <span class="block text-center italic">for</span
      ><span class="block text-center font-semibold text-red-400">the person just like you!</span>
    </h1>

    <p class="py-5 text-center text-lg">
      But firstly, you need to fill the form, so our app can find the best candidates.
    </p>

    <router-link to="/form">
      <custom-button text="Go to the form" buttonType="form"></custom-button>
    </router-link>
  </section>
</template>

<script lang="ts" setup>
import CustomButton from '@/components/Shared/CustomButton.vue';
</script>
