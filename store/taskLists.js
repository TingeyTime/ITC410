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
	async createTaskList({ dispatch }, { title }) {
		const res = await this.$axios.post('api/taskLists', {
			title: title,
            completed: null
		})
		if (res.status === 201) {
			await dispatch('load')
			return 'success'
		}
		return 'failed'
	},

    async load ({ commit }) {
        try {
            const res = await this.$axios.get('api/taskLists')
            if (res.status === 200) {
                commit('setTaskLists', res.data)
            }
        } catch (e) {
            commit('setTaskLists', null)
        }
    }
}
