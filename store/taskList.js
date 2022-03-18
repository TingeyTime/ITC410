export const state = () => {
	return {
		taskLists: []
	}
}

export const mutations = {
	setTaskLists (state, taskLists) {
		state.taskLists = taskLists
	}
}

export const actions = {
	async createTaskList({ commit, state }, { title }) {
		const res = await this.$axios.post('api/taskLists', {
			title: title,
            completed: null
		})
		if (res.status === 201) {
			dispatch('getTaskLists') // FIXME: Should you getUserFromCookie()
		}
	},

	async getTaskLists({commit, state }) {
		const res = await this.$axios.get(`api/taskLists`,)
		if (res.status === 200) {
			commit('setTaskList', res.body.data)
		}
	}
}
