<template>
  <div class="flex justify-center">
    <form @submit.prevent="submit" class="w-1/2 rounded-md border border-red-400 p-5">
      <div class="mb-3">
        <h3 class="mb-1">Name</h3>
        <input
          class="w-full rounded-md border border-black p-2 focus:border-red-400"
          v-model="form.name"
          type="text"
        />
        <p class="text-red-600" v-if="errors?.name">{{ errors.name[0] }}</p>
      </div>

      <div class="mb-3">
        <h3 class="mb-1">Surname</h3>
        <input
          class="w-full rounded-md border border-black p-2 focus:border-red-400"
          v-model="form.surname"
          type="text"
        />
        <p class="text-red-600" v-if="errors?.surname">{{ errors.surname[0] }}</p>
      </div>

      <div class="mb-3">
        <h3 class="mb-1">Email</h3>
        <input
          class="w-full rounded-md border border-black p-2 focus:border-red-400"
          v-model="form.email"
          type="email"
        />
        <p class="text-red-600" v-if="errors?.email">{{ errors.email[0] }}</p>
      </div>

      <div class="mb-3">
        <h3 class="mb-1">Date of birth</h3>
        <input
          class="mb-2 cursor-pointer rounded-md border border-black p-2 focus:border-red-400"
          v-model="form.birthday"
          type="date"
        />
        <p class="text-red-600" v-if="errors?.birthday">{{ errors.birthday[0] }}</p>
      </div>

      <div class="mb-3">
        <h3 class="mb-1">Password</h3>
        <input
          class="w-full rounded-md border border-black p-2 focus:border-red-400"
          v-model="form.password"
          type="password"
        />
        <p class="text-red-600" v-if="errors?.password">{{ errors.password[0] }}</p>
      </div>

      <div class="mb-3">
        <h3 class="mb-1">Confirm Password</h3>
        <input
          class="w-full rounded-md border border-black p-2 focus:border-red-400"
          v-model="form.password_confirmation"
          type="password"
        />
        <p class="text-red-600" v-if="errors?.password_confirmation">
          {{ errors.password_confirmation[0] }}
        </p>
      </div>

      <div class="mt-5 flex justify-center">
        <CustomButton text="Create New Account" :loading="userStore.isLoading"></CustomButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { computed, onUnmounted, reactive, ref } from 'vue';
import CustomButton from '../Shared/CustomButton.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const form = reactive({
  name: '',
  surname: '',
  email: '',
  birthday: '',
  password: '',
  password_confirmation: ''
});

const userStore = useUserStore();

const errors = computed(() => {
  return userStore.singUpErrors;
});
const submit = () => {
  userStore.SIGN_UP(form);
};

onUnmounted(() => {
  userStore.singUpErrors = {};
});

// const router = useRouter();
// const submit = async () => {
//   await axios.get('http://localhost:8000/sanctum/csrf-cookie');
//   await axios
//     .post('http://localhost:8000/register', form)
//     .then(function (response) {
//       console.log(response);
//       router.push({ path: '/login' });
//     })
//     .catch((error) => {
//       if (error.response.status === 422) {
//         errors.value = error.response.data.errors;
//       }
//     });
// };
</script>
