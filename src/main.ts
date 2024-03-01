import { createApp } from 'vue';
import './axios';
import { createPinia } from 'pinia';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faXmark,
  faBars,
  faChevronDown,
  faChevronUp,
  faFilter,
  faMessage,
  faChevronRight,
  faCopyright
} from '@fortawesome/free-solid-svg-icons';

import App from './App.vue';
import router from './router';

library.add(
  faXmark,
  faBars,
  faChevronDown,
  faChevronUp,
  faFilter,
  faMessage,
  faChevronRight,
  faCopyright
);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
