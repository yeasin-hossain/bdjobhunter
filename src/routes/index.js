/* eslint-disable import/no-cycle */
import { lazy } from 'react';

export const publicRoutes = [
  {
    path: '/',
    component: lazy(() => import('../pages/home')),
  },
  {
    path: '/jobs',
    component: lazy(() => import('../pages/jobs')),
  },
  {
    path: '/apply/:jobId',
    component: lazy(() => import('../pages/apply')),
  },
];

export const privateRoute = [
  {
    path: '/profile',
    component: lazy(() => import('../pages/user')),
  },

  {
    path: '/admin',
    component: lazy(() => import('../pages/admin')),
  },
  {
    path: '/admin/manageJobsPost',
    component: lazy(() => import('../pages/admin')),
  },
  {
    path: '/admin/manageJobsApply',
    component: lazy(() => import('../pages/admin')),
  },
  {
    path: '/payment',
    component: lazy(() => import('../pages/auth/payment')),
  },
  {
    path: '/management',
    component: lazy(() => import('../pages/jobPoster')),
  },
  {
    path: '/management/addJob',
    component: lazy(() => import('../pages/jobPoster')),
  },
  {
    path: '/management/postedJobs',
    component: lazy(() => import('../pages/jobPoster')),
  },
  {
    path: '/management/apply',
    component: lazy(() => import('../pages/jobPoster')),
  },
];

export const managementRoutes = [
  {
    path: '/management/addJob',
    component: lazy(() => import('../pages/jobPoster/addJob')),
  },
  {
    path: '/management/postedJobs',
    component: lazy(() => import('../pages/jobPoster/allJobs')),
  },
  {
    path: '/management/apply',
    component: lazy(() => import('../pages/jobPoster/allApply')),
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

export const adminRoutes = [
  {
    path: '/admin/manageJobsPost',
    component: lazy(() => import('../pages/admin/manageJobsPost')),
  },
  {
    path: '/admin/manageJobsApply',
    component: lazy(() => import('../pages/admin/manageJobsApply')),
  },
];
