import axios from 'axios'
import store from '@/store'
import router from '@/router'
import {jwtDecode} from 'jwt-decode'
import {ElMessage} from 'element-plus'
var errorMsg = null // 控制只显示一个错误提示
var errorCode = [401, 403]
// 创建axios 实例
const service = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	timeout: 35000 // 请求超时时间
})


// request拦截器
service.interceptors.request.use(
	config => {
		// 在发送请求之前做些什么
		// console.log(config)
		store.getters.token && (config.headers['authorization'] = store.getters.token) 
		!config.headers['Content-Type'] && (config.headers['Content-Type'] = 'application/json;charset=utf-8')
		config.headers['Pragma'] = 'no-cache'
		config.headers['If-Modified-Since'] = 0
		return config
	},
	error => {
		// 对请求错误做些什么
		return Promise.reject(error)
	}
)

service.interceptors.response.use(
	// 响应码 200
	response => {
		// 对响应数据做点什么
		const config = response.config
		if(config.responseType === 'blob') {
			if(response.data.size < 100 && response.data.type === 'application/json') {
				return Promise.reject({desc: '文件加载错误'})
			}else {
				return response
			}
		}else {
			// token续命
			const res = response.data
			if(res.refreshToken) {
				let token = res.refreshToken
				let user = {}
				let decode = jwtDecode(token)
				user.id = decode['user-id']
				user.username = decode['username']
				user.token = token
				store.commit('SET_USER', user)
				store.commit('SET_TOKEN', token)
			}
			
			if (response.status === 401 || errorCode.indexOf(res.code) !== -1) {
				console.log('xxxx')
				router.push({name: 'login'})
				return
			}
			// 当返回值不为200时，不会触发response处理函数，而是会走error
			if (res.code !== 200) {
				!errorMsg && (errorMsg = ElMessage({
				  message: res.msg,
				  type: 'error',
				  duration: 5 * 1000,
				  onClose: () => {
					errorMsg = null
				  }
				}))
				return Promise.reject(res)
			} else {
				return res
			}
		}
	},
	error => {
		//清楚过期token
		//store.dispatch('logout')
		!errorMsg && ( errorMsg = ElMessage({
			message: error.message,
			type: 'error',
			duration: 5 * 1000,
			onClose() {
				errorMsg = null
			}
		}))	
		return Promise.reject(error)
	}
)

export default service