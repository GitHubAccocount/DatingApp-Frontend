<template>
  <main-nav />
  <router-view />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import MainNav from "@/components/Navigation/MainNav.vue";
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
