import request from '@/api/request.js'


/********************** admin api ********************* */
export function _getAllTagList() {
	return request({
		url: '/home/tag/all',
		method: 'get'
	})
}

export function _createTag(params) {
	return request({
		url: '/admin/tag/add',
		method: 'post',
		data: params
	})
}