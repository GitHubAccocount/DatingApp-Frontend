<template>
  <div class="border-b border-gray-600 py-2" ref="accordion">
    <div class="mt-5 flex items-center justify-between" role="button" @click="showAccordion">
      <p class="text-xl font-bold">{{ accordionTitle }}</p>
      <font-awesome-icon :icon="downUpIcon" />
    </div>
    <div v-show="open">
      <checkboxes></checkboxes>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed, onMounted, onUnmounted, ref } from 'vue';

import checkboxes from './checkboxes.vue';

defineProps({
  accordionTitle: {
    type: String,
    required: true
  }
});

const open = ref(false);
const showAccordion = () => {
  open.value = !open.value;
};

const downUpIcon = computed(() => {
  return ['fas', open.value ? 'chevron-up' : 'chevron-down'];
});

const accordion = ref<HTMLElement | null>(null);

const closeAccordionOnOutsideClick = (event: MouseEvent) => {
  if (accordion.value && !accordion.value.contains(event.target as Node)) {
    open.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', closeAccordionOnOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener('click', closeAccordionOnOutsideClick);
});
</script>
