import request from '@/api/request.js'

// export function getArticleList(params) {
//   return request({
//     url: '/article/list',
//     method: 'get',
//     params
//   })
// }

export function getArticleDetail(params) {
	return request({
		url: '/home/article/articleDetailInfo',
		method: 'post',
		data: params
	})
}

/********************** admin api ********************* */
export function _getArticleList(params) {
	return request({
		url: '/admin/article/list',
		method: 'post',
		data: params
	})
}

export function _getArticleDetail(params) {
	return request({
		url: '/admin/article/detail',
		method: 'post',
		data: params
	})
}

export function _removeArticle(params) {
	return request({
		url: '/admin/article/remove',
		method: 'post',
		data: params
	})
}
export function _updateArticleDetail(params) {
	return request({
		url: '/admin/article/update',
		method: 'post',
		data: params
	})
}


