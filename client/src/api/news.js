import request from '@/utils/request'

// 获取首页资讯列表
export function getIndexNews(params) {
  return request({
    url: '/getIndexNews',
    method: 'get',
    params
  })
}

// 获取资讯列表
export function getNewsList(params) {
  return request({
    url: '/getNewsList',
    method: 'get',
    params
  })
}

// 根据资讯类型id获取资讯
export function getNewsBytype(params) {
  return request({
    url: '/getNewsBytype',
    method: 'get',
    params
  })
}

// 根据资讯id获取资讯
export function getNewsById(params) {
  return request({
    url: '/getNewsById',
    method: 'get',
    params
  })
}

// 增加浏览量
export function addPageView(data) {
  console.log(data)
  return request({
    url: '/addPageView',
    method: 'post',
    data
  })
}