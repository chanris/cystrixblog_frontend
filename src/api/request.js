import axios from 'axios'

import {ElMessage} from 'element-plus'
var errorMsg = null // 控制只显示一个错误提示
// 创建axios 实例
const service = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	timeout: 35000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
	config => {
		// 在发送请求之前做些什么
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
		return response.data
	},
	error => {
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