import request from '@/utils/request'
// 获取banner
export function getBanner(params) {
  return request({
    url: '/getBanner',
    method: 'get',
    params
  })
}