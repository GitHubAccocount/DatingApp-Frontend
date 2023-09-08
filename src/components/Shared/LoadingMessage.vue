<template>
  <div :class="classForLoading" id="loading-message">
    <h2 class="text-2xl">Loading data...</h2>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  classForLoading: {
    type: String,
    required: false,
    default: 'loading-message',
    validator(value: string) {
      return ['loading-message', 'loading-message-80', 'loading-message-full'].includes(value);
    }
  }
});
</script>

<style scoped>
.loading-message {
  @apply flex items-center justify-center;
}

.loading-message-80 {
  @apply h-svh80;
}

.loading-message-full {
  @apply h-full;
}
</style>
