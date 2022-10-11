import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useStore } from '@/stores';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
  ],
});

router.beforeEach(async (to) => {
  const state = useStore();
  if (!state.isLoggedIn && to.name && !['login'].includes(to.name.toString())) {
    return { name: 'login' };
  }
});

export default router;
