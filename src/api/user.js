import request from '@/api/request.js'

export function _getUserInfo() {
	return request({
		url: '/home/user',
	})
}