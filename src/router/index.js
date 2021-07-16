import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{ path: '/', component: () => import('@/views/ListTasks.vue'), name: 'List tasks' },
	{ path: '/add', component: () => import('@/views/AddTask.vue'), name: 'Add task' },
	{ path: '/update/:id', component: () => import('@/views/UpdateTask.vue'), name: 'Update task' }
]

const router = createRouter({
	base: '/dist/',
	linkActiveClass: 'active',
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
