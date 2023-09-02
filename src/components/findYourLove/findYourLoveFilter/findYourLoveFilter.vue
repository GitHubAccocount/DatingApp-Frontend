<template>
  <div class="flex pb-3">
    <custom-button text="Filter" :icon="['fas', 'filter']" @click="SHOW_FILTER"> </custom-button>
  </div>
  <div v-show="showFilter">
    <div
      class="lg:absolute lg:left-0 lg:top-0 lg:flex lg:h-full lg:w-full lg:items-center lg:justify-center lg:bg-white lg:bg-opacity-70"
    >
      <div
        class="absolute left-0 top-0 flex h-2/3 w-1/2 flex-col overflow-y-scroll border border-gray-700 bg-white p-6 lg:relative lg:border-2"
      >
        <div class="">
          <font-awesome-icon
            :icon="['fas', 'xmark']"
            @click="SHOW_FILTER"
            size="2xl"
            role="button"
          ></font-awesome-icon>
        </div>
        <collapsible-accordion accordion-title="Age"></collapsible-accordion>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import CustomButton from '@/components/Shared/CustomButton.vue';
import type { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useUserStore } from '@/stores/user';

import collapsibleAccordion from './collapsibleAccordion.vue';

const userStore = useUserStore();
const showFilter = computed(() => userStore.showFilter);
const SHOW_FILTER = userStore.SHOW_FILTER;
</script>
