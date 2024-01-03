import request from '@/api/request.js'




export function _archiveList(params) {
	return request({
		url: '/home/archive/listArchiveStatisInfoWithPage',
		method: 'post',
		data: params
	})
}