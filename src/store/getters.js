const getters = {
	user: state => state.app.user,
	token: state => state.app.token,
	exp: state => state.app.exp
}

 export default getters