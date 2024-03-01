<template>
  <div class="m-5">
    <div v-show="message">
      <p class="mb-2 w-1/2 rounded-md bg-green-300 p-3 text-green-800">
        {{ message }}
      </p>
    </div>
    <form
      id="form"
      @submit.prevent="submit"
      class="w-1/2 px-5 pb-2 pt-5"
      enctype="multipart/form-data"
    >
      <div v-if="formUser">
        <div>
          <label class="font-bold" for="profile_picture">Profile Picture</label>
          <div>
            <img
              class="mb-2 w-60 rounded-md border border-gray-300"
              v-if="urlPreview"
              :src="urlPreview"
              alt="Preview"
            />
            <img
              v-else
              class="mb-2 w-60 rounded-md border border-gray-300"
              :src="formUser.profile_picture"
              alt="profile picture"
            />
          </div>
          <input
            class="block"
            type="file"
            id="profile_picture"
            name="profile_picture"
            @change="handleFileUpload"
          />
          <span class="block text-red-600" v-if="userStore.errors?.profile_picture">{{
            userStore.errors.profile_picture[0]
          }}</span>
        </div>

        <div class="mt-2">
          <label class="font-bold" for="name">Name</label>
          <input
            class="mb-2 w-full rounded-md border border-black p-2 focus:border-red-400"
            type="text"
            id="name"
            name="name"
            v-model="formUser.name"
          />
          <span class="block text-red-600" v-if="userStore.errors?.name">{{
            userStore.errors.name[0]
          }}</span>
        </div>

        <div class="mt-2">
          <label class="font-bold" for="surname">Surname</label>
          <input
            class="mb-2 w-full rounded-md border border-black p-2 focus:border-red-400"
            type="text"
            id="surname"
            name="surname"
            v-model="formUser.surname"
          />
          <span class="block text-red-600" v-if="userStore.errors?.surname">{{
            userStore.errors.surname[0]
          }}</span>
        </div>

        <div class="mt-2">
          <label class="font-bold" for="email">Email</label>
          <input
            class="mb-2 w-full rounded-md border border-black p-2 focus:border-red-400"
            type="email"
            id="email"
            name="email"
            v-model="formUser.email"
          />
          <span class="block text-red-600" v-if="userStore.errors?.email">{{
            userStore.errors.email[0]
          }}</span>
        </div>

        <div class="mt-3">
          <custom-button text="Save" :loading="userStore.isLoading"></custom-button>
        </div>
      </div>
      <div v-else>Loading...</div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeMount, onBeforeUpdate, computed } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/stores/user';
import CustomButton from '../Shared/CustomButton.vue';
import { preview } from 'vite';

const userStore = useUserStore();

interface User {
  profile_picture?: string;
  name?: string;
  surname?: string;
  email?: string;
}
const user = computed<User | null>(() => userStore.user);

const formUser = ref<User>({
  profile_picture: user.value?.profile_picture,
  name: user.value?.name,
  surname: user.value?.surname,
  email: user.value?.email
});

const urlPreview = ref();
const selectedFile = ref(null);
const handleFileUpload = (event: any) => {
  const file = event.target.files[0];
  urlPreview.value = URL.createObjectURL(file);
  selectedFile.value = file;
};

onMounted(async () => {
  if (!formUser.value.name && !formUser.value.email) {
    await userStore.GET_USER();
  }
});

const message = ref();
const showMessage = (text: string, duration: number) => {
  (message.value = text),
    setTimeout(() => {
      message.value = '';
    }, duration);
};

const submit = async () => {
  userStore.isLoading = true;
  await axios.get('http://localhost:8000/sanctum/csrf-cookie');
  try {
    const form = document.getElementById('form') as HTMLFormElement;
    const formData = new FormData(form);
    formData.append('_method', 'PUT');

    const response = await axios.post('http://localhost:8000/api/update-user', formData);
    showMessage(response.data.message, 3000);
    window.scroll(0, 0);
  } catch (error: any) {
    if (error.response.status == 422) {
      userStore.errors = error.response.data.errors;
    }
    console.log(error);
  } finally {
    userStore.isLoading = false;
  }
};
</script>
