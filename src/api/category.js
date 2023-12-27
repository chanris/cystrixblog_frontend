import request from '@/api/request.js'


/********************** admin api ********************* */
export function _categoryTree(params) {
	return request({
		url: '/admin/category/tree',
		method: 'post',
		data: params
	})
}