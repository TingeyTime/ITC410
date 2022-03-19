export const state = () => {
	return {
		taskLists: [
			{
				title: "Test 3"
			},
		]
	}
}

export const mutations = {
	setTaskLists (state, taskLists) {
		state.taskLists = taskLists
	}
}

export const actions = {
	async createTaskList({ commit }, { title }) {
		const res = await this.$axios.post('api/taskLists', {
			title: title,
            completed: null
		})
		if (res.status === 201) {
			await dispatch('getTaskLists')
			return 'success'
		}
		return 'failed'
	},

	async getTaskLists({ commit }) {
		console.log('getting task lists...')
		const res = await this.$axios.get(`api/taskLists`,)
		if (res.status === 200) {
			commit('setTaskLists', res.body)
		}
	}
}
