import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/index'
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
    },
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/admin/login.vue'),
		beforeEnter: (to, from, next) => {
			if(store.getters.token) {
				next('/admin')
			}else {
				next()
			}
		}
	},
	{
		path: '/admin',
		name: 'adminIndex',
		component: () => import('@/views/admin/index.vue'),
		children: [
			{
				path: '/home',
				name: 'adminHome',
				component: () => import('@/views/admin/home.vue')
			},
			{
				path: '/article',
				name: 'adminArticle',
				component: () => import('@/views/admin/article/index.vue'),
			},
			{
				path: '/article/add',
				name: 'adminArtileAdd',
				component: () => import('@/views/admin/article/addArticle.vue')
			},
			{
				path: '/tag',
				name: 'adminTag',
				component: () => import('@/views/admin/tag/index.vue')
			},
			{
				path: '/category',
				name: 'adminCategory',
				component: () => import('@/views/admin/category/index.vue')
			}
		]
	}
  ],
})

router.beforeEach((to, from, next) => {
	// 未定义路由跳转首页
	if(router.hasRoute(to.name)) {
		// 检查token
		if(to.name.startsWith('admin')) {
			const token = store.getters.token
			const exp = store.getters.exp
			if(token && new Date().getTime() < exp) {
				next()
			}else {
				next('/login')
			}
		}else {
			next()
		}
	}else {
		next('/')
	}
})

export default router
