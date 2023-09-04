<template>
  <footer class="mt-10 bg-gray-100">
    <div class="flex flex-col items-center p-16">
      <div>
        <h1 class="p5 text-3xl font-bold">Date-App</h1>
      </div>
      <div class="flex py-2">
        <router-link to="/"><h2 class="p-3 text-lg text-red-400">Home</h2></router-link>
        <router-link to="/blog"><h2 class="p-3 text-lg text-red-400">Blog</h2></router-link>
      </div>
    </div>
    <div class="flex justify-center bg-gray-700 py-2 text-sm text-white">
      <p><font-awesome-icon :icon="['fas', 'copyright']" class="pr-1" />2023. Adrian Rutka</p>
    </div>
  </footer>
</template>

<script lang="ts" setup></script>
