<template>
  <div>User Page for user id: {{ currentUserId }}</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const currentUserId = computed(() => route.params.id);
</script>
