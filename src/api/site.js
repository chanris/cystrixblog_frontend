import request from '@/api/request.js'


export function _randomMottos(params) {
	return request({
		url: `/home/siteInfo/randomMottos?num=${params}`,
		method: 'get',
	})
}
