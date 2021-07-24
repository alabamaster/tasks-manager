import { createStore } from 'vuex'

export default createStore({
	state: {
		tasks: JSON.parse(localStorage.getItem('localTasks') ?? '[]'),
		allTags: JSON.parse(localStorage.getItem('localTasksTags') ?? '[]')
	},
	mutations: {
		addTask(state, task) {
			task.status = task.endpoint < Date.now() ? 'outdate' : task.status
			state.tasks.push(task)

			// const tags = [...state.allTags, ...task.tags]
			// state.allTags = tags.filter((i, idx) => tags.indexOf(i) === idx)

			state.allTags = Array.from(new Set([...state.allTags, ...task.tags])) // khm...

			this.commit('updateLocalStore')
		},
		updateTask(state, task) {
			const idx = state.tasks.findIndex(item => item.id === task.id)

			state.tasks[idx] = {
				id: task.id,
				title: task.title,
				desc: task.desc,
				task: task.tags,
				status: task.endpoint < Date.now() ? 'outdate' : task.status,
				endpoint: task.endpoint
			}

			this.commit('updateLocalStore')
		},
		completeTask(state, id) {
			state.tasks[id].status = 'completed'
			this.commit('updateLocalStore')
		},
		removeTask(state, id) {
			state.tasks.splice(id, 1)
			this.commit('updateLocalStore')
		},
		updateLocalStore(state) {
			localStorage.setItem('localTasks', JSON.stringify(state.tasks))
			localStorage.setItem('localTasksTags', JSON.stringify(state.allTags))
		}
	},
	getters: {
		tasks(state) {
			return state.tasks
		},
		allTags(state) {
			return state.allTags
		}
	}
})
