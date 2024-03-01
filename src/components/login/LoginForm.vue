<template>
  <div class="flex justify-center">
    <form @submit.prevent="handleLogin" class="w-1/2 rounded-md border border-red-400 p-5">
      <div>
        <h3 class="mb-1">Email</h3>
        <input
          class="mb-2 w-full rounded-md border border-black p-2 focus:border-red-400"
          v-model="form.email"
          type="email"
        />
        <span class="block text-red-600" v-if="userStore.errors?.email">{{
          userStore.errors.email[0]
        }}</span>
      </div>

      <div>
        <h3 class="mb-1">Password</h3>
        <input
          class="w-full rounded-md border border-black p-2 focus:border-red-400"
          v-model="form.password"
          type="password"
        />
      </div>

      <div class="mt-5 flex justify-center">
        <CustomButton text="Login" :loading="userStore.isLoading"></CustomButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CustomButton from '../Shared/CustomButton.vue';
import { useUserStore } from '@/stores/user';
import { error } from 'console';

const form = ref({
  email: '',
  password: ''
});

const router = useRouter();
const route = useRoute();
// const handleLogin = async () => {
//   await axios.get('http://localhost:8000/sanctum/csrf-cookie');
//   await axios.post('http://localhost:8000/login', {
//     email: form.value.email,
//     password: form.value.password
//   });
//   router.push('/profile');
// };

const userStore = useUserStore();

const handleLogin = () => {
  userStore.LOGIN(form.value);
  // .then(async () => {
  // const redirectPath = Array.isArray(route.query.redirect)
  //   ? route.query.redirect[0]
  //   : route.query.redirect;
  // const redirect = redirectPath || '/';
  // await router.push(redirect);
  // window.location.reload();
  // })
  // .catch((error) => {
  //   console.log('Error: ', error);
  // });
};
</script>
