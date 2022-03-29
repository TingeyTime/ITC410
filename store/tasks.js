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

	async updateTask({ dispatch }, { listId, taskId, title, description, duration, complete }) {
		console.log('updating task', taskId)
		const res = await this.$axios.put(`api/tasks/${taskId}`, {
			title: title,
            description: description,
            duration: Number(duration),
            complete: complete
		})
		if (res.status === 200) {

			await dispatch('load', { list_id: listId })
			return 'success'
		}
		console.warn(res)
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

	async delete ({ dispatch }, { taskId, listId }) {
		try {
			const res = await this.$axios.delete(`api/tasks/${taskId}`)
			if (res.status === 204) {
				// notify
				await dispatch('load', { list_id: listId })
				return 'success'
			}
		} catch (e) {
			// do something
			console.log('delete of ' + taskId + ' failed.')
			return 'failed'
		}
	}
}
