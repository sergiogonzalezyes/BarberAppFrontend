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
    meta: { requiresAuth: true, requiredRole: ['admin', 'barber', 'customer'] },
  },
  // Profile Route
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: { requiresAuth: true, requiredRole: ['admin', 'customer', 'barber'] },
  },
  // Schedule Route
  {
    path: '/schedule',
    name: 'Schedule',
    component: () => import('@/views/ScheduleView.vue'),
    meta: { requiresAuth: true, requiredRole: ['admin', 'barber'] },
  },
  // Services Route
  {
    path: '/services',
    name: 'Services',
    component: () => import('@/views/ServicesView.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue'),
  },
  {
    path: '/reviews',
    name: 'Reviews',
    component: () => import('@/views/ReviewsView.vue'),
  },
  // // Settings Route
  // {
  //   path: '/settings',
  //   name: 'Settings',
  //   component: () => import('@/views/SettingsView.vue'),
  //   meta: { requiresAuth: true, requiredRole: ['admin'] },
  // },
  // // Signup Route
  // {
  //   path: '/signup',
  //   name: 'Signup',
  //   component: () => import('@/views/SignupView.vue'),
  // },
  // // Error Route
  // {
  //   path: '/error',
  //   name: 'Error',
  //   component: () => import('@/views/ErrorView.vue'),
  // },
  // test route
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/ParentTest.vue'),
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
  const role = store.state.role; // assuming role is stored here
  const requiredRoles = to.meta.requiredRole;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      // User is not authenticated, redirect to login
      next('/login');
    } else if (requiredRoles && !requiredRoles.includes(role)) {
      // User is authenticated but does not have the required role, handle this as needed
      next('/error');
    } else {
      // User is authenticated and has the required role, allow navigation
      next();
    }
  } else if (to.path === '/login' && isAuthenticated) {
    // If trying to access login page while authenticated, redirect based on role
    switch (role) {
      case 'admin':
      case 'barber':
        next('/schedule');
        break;
      default:
        next('/');
    }
  } else {
    // Route does not require authentication, allow navigation
    next();
  }
});


export default router;
