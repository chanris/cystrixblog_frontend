import request from '@/api/request.js'


export function getVerificationCode(params) {
	return request({
		url: '/home/user/getVerificationCode',
		method: 'post',
		data: params
	})
}

export function loginWithEmailCode(params) {
	return request({
		url: '/admin/user/login',
		method: 'post',
		data: params
	})
}