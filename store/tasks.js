export const state = () => {
	return {
		tasks: []
	}
}

export const mutations = {
	setTasks (state, tasks) {
		state.tasks = tasks
	}
}

export const actions = {
	async createTask({ dispatch }, { listId, title, description, duration }) {
		const res = await this.$axios.post(`api/taskLists/${listId}/tasks`, {
			title: title,
            description: description,
            duration: duration,
            completed: null
		})
		if (res.status === 201) {
			await dispatch('load')
			return 'success'
		}
		return 'failed'
	},

    async load ({ commit }, listId) {
        try {
            const res = await this.$axios.get(`api/taskLists/${listId}/tasks`)
            if (res.status === 200) {
                commit('setTasks', res.data)
            }
        } catch (e) {
            commit('setTasks', null)
        }
    },

	async delete ({ dispatch }, taskId) {
		try {
			const res = await this.$axios.delete(`api/tasks/${taskId}`)
			if (res.status === 204) {
				// notify
				await dispatch('load')
				return 'success'
			}
		} catch (e) {
			// do something
			console.log('delete of ' + taskId + ' failed.')
			return 'failed'
		}
	}
}
