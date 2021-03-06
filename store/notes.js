export const state = () => {
	return {
		note: ""
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
            console.log(res)
            if (res.status === 200) {
                commit('setNote', res.data)
				return 'success'
            }
        } catch (e) {
            commit('setNote', "")
			return 'failed'
        }
    },

    async updateNote ({ commit }, content) {
        try {
            console.log("Updating Note");
            const userText = content ? content : " "
            const res = await this.$axios.put(`api/notes`,
                userText,
                {
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                }
            )
            console.log(res.status)
            console.log(userText)
            if (res.status === 200) {
                commit('setNote', res.data)
				return 'success'
            }
        } catch (e) {
            console.log(e)
			return 'failed'
        }
    }
}