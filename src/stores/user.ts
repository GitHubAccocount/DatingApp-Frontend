import { computed, reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import type { SignUpErrors } from '@/api/types';

export const useUserStore = defineStore('user', () => {
  const isLoading = ref(false);
  const isLoadingGlobal = ref(false);

  const router = useRouter();
  const route = useRoute();

  interface FormErrorsInterface {
    profile_picture?: string[];
    name?: string[];
    surname?: string[];
    email?: string[];
    password?: string[];
  }
  const errors = ref<FormErrorsInterface>({});

  const isAuthenticated = computed(() => !!localStorage.getItem('auth'));

  const GET_TOKEN = async () => {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie');
  };

  // ========== START SIGN UP ==========

  const singUpErrors = ref<SignUpErrors>({});

  const SIGN_UP = async (form: object) => {
    isLoading.value = true;
    await GET_TOKEN();
    try {
      await axios.post('http://localhost:8000/register', form);
      router.push({ path: '/login' });
    } catch (error: any) {
      if (error.response.status === 422) {
        singUpErrors.value = error.response.data.errors;
      }
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  // ========== END SIGN UP ==========

  const user = ref(null);
  const GET_USER = async () => {
    isLoadingGlobal.value = true;
    try {
      const response = await axios.get('http://localhost:8000/api/user');
      user.value = response.data;
    } catch (error) {
      user.value = null;
      console.log(error);
    } finally {
      isLoadingGlobal.value = false;
    }
  };

  const LOGIN = async (form: object) => {
    isLoading.value = true;
    await GET_TOKEN();
    try {
      const response = await axios.post('http://localhost:8000/login', form);
      await GET_USER();
      if (response.status == 204) {
        // by adding 'auth' to local storage it keep authenticated state
        // even after page reload
        localStorage.setItem('auth', 'true');
        const redirectPath = Array.isArray(route.query.redirect)
          ? route.query.redirect[0]
          : route.query.redirect;
        const redirect = redirectPath || '/';

        await router.push(redirect);
        window.location.reload();
      }
    } catch (error: any) {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    } finally {
      isLoading.value = false;
    }
  };

  const LOGOUT = async () => {
    isLoading.value = true;
    await GET_TOKEN();
    try {
      await axios.post('/logout');
      user.value = null;
      await router.push({ name: 'login' });
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
      localStorage.removeItem('auth');
      window.location.reload();
    }
  };

  const showNav = ref(false);
  const SHOW_NAV = () => {
    showNav.value = !showNav.value;
  };

  const showFilter = ref(false);
  const SHOW_FILTER = () => {
    showFilter.value = !showFilter.value;
  };

  const selectedAge = ref<string[]>([]);
  const SELECT_AGE = (ages: string[]) => {
    selectedAge.value = ages;
  };

  const CLEAR_SELECTION = () => {
    selectedAge.value = [];
  };

  return {
    errors,
    isAuthenticated,
    isLoading,
    isLoadingGlobal,
    showNav,
    showFilter,
    selectedAge,
    singUpErrors,
    user,
    SHOW_NAV,
    SHOW_FILTER,
    SELECT_AGE,
    CLEAR_SELECTION,
    LOGIN,
    GET_USER,
    GET_TOKEN,
    LOGOUT,
    SIGN_UP
  };
});
