<template>
  <button :class="type">
    {{ text }}
  </button>
</template>

<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: false,
    default: 'loginButton',
    validator(value: string) {
      return ['loginButton', 'form'].includes(value);
    }
  }
});
</script>

<style scoped>
button {
  @apply cursor-pointer rounded-md px-3 py-2 font-bold 2xl:border-2 2xl:px-6 2xl:py-4 2xl:text-2xl;
}
.loginButton {
  @apply border border-red-400 hover:bg-red-400 hover:text-rose-50;
}
.form {
  @apply border-4 border-white px-5 py-3 text-lg shadow-sm shadow-slate-700 hover:bg-white hover:text-red-400 hover:shadow-red-400 active:translate-y-1 active:shadow-none;
}
</style>
