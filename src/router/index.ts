import { useQuestionsStore } from '@/stores/questions';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/find',
      name: 'find',
      component: import('@/views/FindView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('@/views/BlogView.vue')
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('@/views/FormView.vue'),
      meta: { requiresAuth: true, requiresEmpathyFormSubmission: true }
    },
    {
      path: '/form/2',
      name: 'form2',
      component: () => import('@/views/FormPersonalView.vue'),
      meta: { requiresAuth: true, requiresFormSubmission: true }
    },
    {
      path: `/find/:id`,
      name: 'user',
      component: () => import('@/views/SingleUserView.vue')
    },
    {
      path: `/blog/:id`,
      name: 'single blog',
      component: () => import('@/views/SingleBlogView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignUpView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/Profile.vue'),
      meta: { requiresAuth: true }
    }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

router.beforeEach(async (to, from) => {
  const questionStore = useQuestionsStore();
  const userStore = useUserStore();
  userStore.isLoadingGlobal = true;
  // Waiting for getting user occurs only during accessing pages with 'requiresAuth' meta field.
  // Otherwise, other routes would be slower to render as well. With this condition only routes
  // which requires authenticated user render slower.
  if (to.meta.requiresAuth) {
    // I had to wait for getting user. Otherwise, during reloading the page with
    // 'requiresAuth' meta field, user was redirected to login page
    if (!userStore.isAuthenticated) {
      await userStore.GET_USER();
    }

    if (!userStore.isAuthenticated) {
      return {
        path: '/login',
        query: { redirect: to.fullPath }
      };
    }
  }

  if (to.meta.requiresFormSubmission) {
    // const response = await axios.get(
    //   'http://localhost:8000/api/personal-informations/get-form-submission-state'
    // );
    await questionStore.GET_PERSONAL_INFO_STATE();
    if (questionStore.personalInfoTestState) {
      return { path: '/find' };
    }
  }

  if (to.meta.requiresEmpathyFormSubmission) {
    await questionStore.GET_EMPATHY_STATE();
    if (questionStore.empathyTestState) {
      return { path: '/form/2' };
    }
  }
});

router.afterEach(() => {
  const userStore = useUserStore();
  userStore.isLoadingGlobal = false;
});

export default router;
