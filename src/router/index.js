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
      path: '/article/detail/:id',
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
			// 已经登录跳转到后台首页
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
		// redirect: '/admin',
		children: [
			{
				path: '',
				name: 'adminHome',
				meta: { title: '首页'},
				component: () => import('@/views/admin/home.vue')
			},
			{
				path: 'article',
				name: 'adminArticle',
				meta: {title: '文章管理'},
				component: () => import('@/views/admin/article/index.vue'),
			},
			{
				path: 'article/add',
				name: 'adminArticleAdd',
				meta: {title: '添加文章'},
				component: () => import('@/views/admin/article/add.vue')
			},
			{
				path: 'article/detail/:id',
				name: 'adminArtileDetail',
				meta: { title: '文章详情'},
				component: () => import('@/views/admin/article/detail.vue')
			},
			{
				path: 'tag',
				name: 'adminTag',
				meta: { title: '标签管理'},
				component: () => import('@/views/admin/tag/index.vue')
			},
			{
				path: 'category',
				name: 'adminCategory',
				meta: { title: '分类管理'},
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
			// console.log(to)
			if(token && new Date().getTime() < exp) {
				next()
			}else {
				// 过期 清除token
				store.dispatch('logout')
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
