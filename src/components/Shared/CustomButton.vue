<template>
  <button :class="buttonType">
    <font-awesome-icon v-if="icon" :icon="icon" class="pr-1"></font-awesome-icon>
    <span>{{ text }}</span>

    <svg
      v-show="loading"
      class="ml-2 inline h-5 w-5 animate-spin"
      :class="{ 'text-gray-800': buttonType === 'logout', 'text-red-800': buttonType !== 'logout' }"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        fill="currentColor"
      ></path>
    </svg>
  </button>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';

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
  },
  loading: Boolean
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

.logout {
  @apply ml-2 border border-gray-400 hover:bg-gray-400 hover:text-white;
}
</style>
