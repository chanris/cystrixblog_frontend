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