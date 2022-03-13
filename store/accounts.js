export const state = () => {
	return {
		user: getUserFromCookie()
	}
}

export const mutations = {
	setUser (state, user) {
		state.user = user
	}
}

export const actions = {
	async createAccount({ commit, state }, {email, name, username, password}) {
		const res = await this.$axios.post('api/accounts', {
			email,
			username,
			name,
			password
		})
		if (res.status === 201) {
			commit('setUser', username) // FIXME: Should you getUserFromCookie()
		}
	},

	async getAccount({commit, state }, { username }) {
		const res = await this.$axios.get(`api/accounts/${ username }`,)
		if (res.status === 200) {
			commit('setUser', res.body.data)
		}
	},

	// async login ({ commit, state }, { username, password }) {
	// 	const res = await this.$axios.put('api/authentication/login', {
	// 		username,
	// 		password
	// 	})
	// 	if (res.status === 200) {
	// 		commit('setUser', username)  // FIXME: Should you getUserFromCookie()
	// 	}
	// },

	// async logout({ commit }) {
	// 	const res = await this.$axios.put('api/authentication/logout')
	// 	if (res.status === 200) {
	// 		console.log('user logged out...')
	// 		commit('setUser', null)
	// 	}
	// }
}

// Check if the user cookie is set and if so get the cookie value.
// This cookie is set in addition to the session cookie when the user
// authenticated, but this cookie is made accessible to the browser's
// JavaScript.
function getUserFromCookie () {
	const re = new RegExp("user=([^;]+)")
	const value = re.exec(document.cookie)
	return value != null ? unescape(value[1]) : null
}
