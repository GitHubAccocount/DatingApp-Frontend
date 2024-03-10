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

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
window.Pusher = Pusher;

declare global {
  interface Window {
    Pusher: any;
    Echo: Echo;
  }
}

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'f1f416879f9b2dad6bb3',
  wsHost: '127.0.0.1',
  wsPort: 6001,
  cluster: 'eu',
  forceTLS: false,
  disableStats: true,
  authEndpoint: 'http://127.0.0.1:8000/api/broadcasting/auth',
  auth: {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
});

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
