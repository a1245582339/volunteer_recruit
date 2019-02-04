import request from '@/utils/request'
// 获取招募列表
export function getRecruit(params) {
  return request({
    url: '/recruit',
    method: 'get',
    params
  })
}

// 应召
export function createOrder(data) {
  return request({
    url: '/createOrder',
    method: 'post',
    data
  })
}

// 获取招募列表
export function checkOrderExist(params) {
  return request({
    url: '/checkOrderExist',
    method: 'get',
    params
  })
}

// 获取应召列表
export function getOrder(params) {
  return request({
    url: '/getOrder',
    method: 'get',
    params
  })
}