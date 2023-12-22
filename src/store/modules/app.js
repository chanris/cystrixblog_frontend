import {jwtDecode} from 'jwt-decode'

const app = {
	state: {
		user: null,
		token: null,
		exp: null
	},
	mutations: {
		SET_USER: (state, user) => {
			state.user = user
		},
		SET_TOKEN: (state, token) => {
			state.token = token
			state.exp = jwtDecode(token).exp * 1000 // ms
		}
	},
	actions: {
		setLoginInfo({commit}, user) {
			commit('SET_USER', user)
			commit('SET_TOKEN', user.token)
		}
	}
}

export default app