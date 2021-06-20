import { lazy } from 'react';

export const publicRoutes = [
  {
    path: '/',
    component: lazy(() => import('../pages/home')),
  },
];

export const privateRoute = [
  {
    path: '/jobs',
    component: lazy(() => import('../pages/jobs')),
  },
  {
    path: '/profile',
    component: lazy(() => import('../pages/user')),
  },
  {
    path: '/apply',
    component: lazy(() => import('../pages/apply')),
  },
];

export const authRoutes = [
  {
    path: '/login',
    component: lazy(() => import('../pages/auth/login')),
  },
  {
    path: '/register',
    component: lazy(() => import('../pages/auth/register')),
  },
];
