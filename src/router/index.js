import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/index.vue'),
    },
    {
      path: '/article/detail',
      name: 'articleDetail',
      component: () => import('@/views/article/detail.vue'),
    },
    {
      path: '/tags',
      name: 'tags',
      component: () => import('@/views/tags.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('@/views/categories.vue')
    },
    {
      path: '/archive',
      name: 'archive',
      component: () => import('@/views/archive.vue')
    }
  ],
})

export default router
