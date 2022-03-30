export const state = () => {
	return {
		note: []
	}
}

export const mutations = {
	setNote (state, note) {
		state.note = note
	}
}

export const actions = {

    async load ({ commit }) {
        try {
			console.log("Getting note");
            const res = await this.$axios.get(`api/notes`)
            if (res.status === 200) {
                commit('setnote', res.data)
				return 'success'
            }
        } catch (e) {
            commit('setnote', "")
			return 'failed'
        }
    },

    async updateNote ({ dispatch }, content) {
        try {
            console.log ("Updating Note");
            const res = await this.$axios.get(`api/notes`, content)
            if (res.status === 200) {
                commit('setnote', res.data)
				return 'success'
            }
        } catch (e) {
			return 'failed'
        }
    }
}