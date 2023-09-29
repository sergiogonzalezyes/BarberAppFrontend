// router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/app';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import('@/views/NotificationsView.vue'),
    meta: { requiresAuth: true, requiredRole: ['admin'] },
  },
  // New Profile Route
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: { requiresAuth: true, requiredRole: ['admin', 'customer', 'barber'] },
  },
  // Fallback route redirects any unmatched routes to '/'
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// Navigation guard to check authentication and required roles
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.isAuthenticated;
  const requiredRoles = to.meta.requiredRole;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      // User is not authenticated, redirect to login
      next('/login');
    } else if (requiredRoles && !requiredRoles.includes(store.state.role)) {
      // User is authenticated but does not have the required role, handle this as needed
      next('/error');
    } else {
      // User is authenticated and has the required role, allow navigation
      next();
    }
  } else {
    // Route does not require authentication, allow navigation
    next();
  }
});

export default router;
