import { createStore} from 'vuex'
import getters from './getters'
const state = {
    user: {
		name: 'defaultUser',
		role: 1,
		token: 'xassdasd1sdpasjdpasd'
	},
    token: null,
}

const mutations = {}

const actions = {}

const store = createStore({
    state,
	mutations: {},
	actions: {},
	getters,
	modules: {}
})

export default store