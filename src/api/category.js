import request from '@/api/request.js'

export function _categoryTree2(params) {
	return request({
		url: '/home/category/tree',
		method: 'post',
		data: params
	})
}
/********************** admin api ********************* */
export function _categoryTree(params) {
	return request({
		url: '/admin/category/tree',
		method: 'post',
		data: params
	})
}

export function _getCategoryByArticleId(params) {
	return request({
		url: '/home/category/getCategoryByArticleId',
		method: 'post',
		data: params
	})
}

export function _updateCategoryRef(params) {
	return request({
		url: '/admin/category/updateCategoryRef',
		method: 'post',
		data: params
	})
}

export function _addCategory(params) {
	return request({
		url: '/admin/category/add',
		method: 'post',
		data: params
	})
}

export function _removeCategory(params) {
	return request({
		url: '/admin/category/delete',
		method: 'post',
		data: params
	})
}