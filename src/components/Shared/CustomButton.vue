<template>
  <button :class="buttonType">
    <font-awesome-icon v-if="icon" :icon="icon" class="pr-1"></font-awesome-icon>
    {{ text }}
  </button>
</template>

<script lang="ts" setup>
import { arrayBuffer } from 'stream/consumers';

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  buttonType: {
    type: String,
    required: false,
    default: 'loginButton',
    validator(value: string) {
      return ['loginButton', 'form'].includes(value);
    }
  },
  icon: {
    type: Array,
    default: null
  }
});
</script>

<style scoped>
button {
  @apply cursor-pointer rounded-md px-3 py-2 font-bold sm:text-lg 2xl:border-2 2xl:px-6 2xl:py-4 2xl:text-2xl;
}
.loginButton {
  @apply border border-red-400 hover:bg-red-400 hover:text-rose-50;
}
.form {
  @apply border-4 border-white px-5 py-3 text-lg shadow-sm shadow-slate-700 hover:bg-white hover:text-red-400 hover:shadow-red-400 active:translate-y-1 active:shadow-none;
}
</style>
