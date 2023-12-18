import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/',
        name: 'index',
        component: () => import('@/views/index.vue')
    },
    {
        path: '/article/detail',
        name: 'articleDetail',
        component: () => import('@/views/article/detail.vue')
    }
  ],
})

export default router
