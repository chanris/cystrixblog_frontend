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

export function _getTagListByArticleId(params) {
	return request({
		url: '/home/tag/list',
		method: 'post',
		data: params
	})
}

export function _deleteRef(params) {
	return request({
		url: '/admin/tag/deleteRef',
		method: 'post',
		data: params
	})
}

export function _batchAddRef(params) {
	return request({
		url: '/admin/tag/batchAddRef',
		method: 'post',
		data: params
	})
}

export function _getTagListWithPage(params) {
	return request({
		url: '/home/tag/page',
		method: 'post',
		data: params
	})
}