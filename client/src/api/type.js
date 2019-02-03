import request from '@/utils/request';
// 获取课程类型
export function courseClassList(params) {
  return request({
    url: '/courseClassList',
    method: 'get',
    params
  })
}
// 获取资讯类型
export function getNewsType(params) {
  return request({
    url: '/getNewsType',
    method: 'get',
    params
  })
}
