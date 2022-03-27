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
            duration: Number(duration),
            completed: null
		})
		if (res.status === 201) {
			await dispatch('load', { list_id: listId })
			return 'success'
		}
		return 'failed'
	},

    async load ({ commit }, { list_id }) {
        try {
			console.log("Getting tasks for", list_id);
            const res = await this.$axios.get(`api/taskLists/${list_id}/tasks`)
            if (res.status === 200) {
                commit('setTasks', res.data)
				return 'success'
            }
        } catch (e) {
            commit('setTasks', null)
			return 'failed'
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
