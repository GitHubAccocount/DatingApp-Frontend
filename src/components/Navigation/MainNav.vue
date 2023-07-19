<template>
  <header>
    <div class="border border-green-500 h-full absolute w-full bg-red-400">
      <nav>
        <ul>
          <li
            v-for="item in menuItems"
            :key="item.text"
            class="border-b border-red-900 p-3 last:shadow-md hover:bg-red-600 active:bg-red-600 active:shadow-inner"
          >
            <router-link :to="item.url" class="block">{{
              item.text
            }}</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const menuItems = ref([
  { text: "Home", url: "/" },
  { text: "Find Your Love", url: "/find" },
  { text: "Blog", url: "/blog" },
]);
</script>
