import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './components/Login.vue'

Vue.use(VueRouter)

const router =  new VueRouter({
	mode: 'history',
	linkActiveClass: "active",
	linkExactActiveClass: "exact-active",
	routes: [
		{
			path: '/',
			component: () => import('./components/CheckLists.vue'),
			name: 'checklists'
		},
		{
			path: '/login',
			name: 'user.login',
			component: Login
		},
		{
			path: '/register',
			name: 'user.register',
			component: () => import('./components/Register.vue')
		},
		{
			path: '/admin',
			name: 'admin',
			component: () => import('./components/Admin.vue'),
			children: [
				{
					path: '/admin/users',
					name: 'users',
					component: () => import('./components/admin/Users.vue')
				},
				{
					path: '/admin/roles',
					name: 'roles',
					component: () => import('./components/admin/Roles.vue')
				}
			]
		},
		{
			path: '*',
			redirect: '/'
		}
	]
})

router.beforeEach( ( to, from, next) => {
	const token = localStorage.getItem('x_xsrf_token')

	if (! token) {
		if (to.name === 'user.login' || to.name === 'user.register') {
			return next()
		}

		return next({
			name: 'user.login'
		})
	}
	else {
		if (to.name === 'user.login' || to.name === 'user.register') {
			return next({name:'checklists'})
		}
		return next()
	}


})

export default router