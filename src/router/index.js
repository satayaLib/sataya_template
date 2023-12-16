import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useProfileStore } from '@/stores/profile';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/rules',
      name: 'rules',
      component: () => import('../views/RulesView.vue')
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../views/ShopView.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue')
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  if (to.query?.token) {
    const storeProfile = useProfileStore();
    await storeProfile.refreshToken(to.query.token);
    return next('/');
  }

  next();
});

export default router;
