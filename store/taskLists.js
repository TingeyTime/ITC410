export const state = () => {
	return {
		taskLists: [],
		taskList: {}
	}
}

export const mutations = {
	setTaskLists (state, taskLists) {
		state.taskLists = taskLists
	}
}

export const actions = {
	async createTaskList({ dispatch }, { title }) {
		console.log('creating list...')
		const res = await this.$axios.post('api/taskLists', {
			title: title,
            completed: null
		})
		console.log(res)
		if (res.status === 201) {
			await dispatch('load')
			return 'success'
		}
		return 'failed'
	},

	async updateList({ dispatch }, { title, list_id, completed }) {
		try {
			const res = await this.$axios.put(`api/taskLists/${list_id}`,
			{
				title: title,
				completed: completed ?? null
			})
			if (res.status === 200) {
				// notify
				await dispatch('load')
				return 'success'
			}
		} catch (e) {
			// do something
			console.log('update of ' + listId + ' failed.')
			return 'failed'
		}
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
    },

	async delete ({ dispatch }, listId) {
		try {
			const res = await this.$axios.delete(`api/taskLists/${listId}`)
			if (res.status === 204) {
				// notify
				await dispatch('load')
				return 'success'
			}
		} catch (e) {
			// do something
			console.log('delete of ' + listId + ' failed.')
			return 'failed'
		}
	}
}
