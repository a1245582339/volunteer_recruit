import request from '@/utils/request'
// 获取banner
export function getBanner(params) {
  return request({
    url: '/getBanner',
    method: 'get',
    params
  })
}

// 修改banner
export function updataBanner(data) {
  return request({
    url: '/updataBanner',
    method: 'post',
    data
  })
}