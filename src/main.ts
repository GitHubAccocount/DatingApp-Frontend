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

// Step 1: Get the CSRF token from cookies
function getCsrfToken() {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'XSRF-TOKEN') {
      return decodeURIComponent(value);
    }
  }
  return null; // CSRF token cookie not found
}

// Step 2: Set the CSRF token in Axios headers
const csrfToken = getCsrfToken();
if (csrfToken) {
  axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
}

// Step 3: Initialize Laravel Echo with Axios for authentication
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'f1f416879f9b2dad6bb3',
  wsHost: '127.0.0.1',
  host: window.location.hostname,
  wsPort: 6001,
  cluster: 'eu',
  forceTLS: false,
  disableStats: true,
  authEndpoint: 'http://127.0.0.1:8000/api/broadcasting/auth',
  authorizer: (channel: any, options: any) => {
    return {
      authorize: (socketId: any, callback: any) => {
        axios
          .post('/api/broadcasting/auth', {
            socket_id: socketId,
            channel_name: channel.name
          })
          .then((response) => {
            callback(false, response.data);
          })
          .catch((error) => {
            callback(true, error);
          });
      }
    };
  }
});

import App from './App.vue';
import router from './router';
import axios from 'axios';

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
