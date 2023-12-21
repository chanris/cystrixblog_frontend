import request from '@/api/request.js'


export function getVerificationCode(params) {
	return request({
		url: '/home/user/getVerificationCode',
		method: 'post',
		data: params
	})
}