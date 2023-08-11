<template>
  <main>
    <section class="h-svh80 px-6">
      <div
        class="grid h-full grid-rows-2 rounded-md border bg-red-100 shadow-md shadow-gray-700 lg:grid-cols-2 lg:grid-rows-none"
      >
        <!-- Image container -->
        <div class="row-span-1 lg:col-span-1">
          <photos></photos>
        </div>
        <!-- Content container -->
        <div class="row-span-1 flex flex-col items-center pt-6 lg:col-span-1 lg:justify-center">
          <h1 class="text-xl font-bold xs:text-2xl sm:text-4xl">Want to find your other half?</h1>
          <h3 class="pb-6 text-xs xs:text-base sm:text-2xl">
            Fill the form and find the
            <span class="font-semibold text-red-400">person just like you!</span>
          </h3>
          <router-link to="/form">
            <custom-button text="Go to the form" buttonType="form"></custom-button>
          </router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import CustomButton from '@/components/Shared/CustomButton.vue';
import Photos from '@/components/loveSearch/Photos.vue';
</script>
