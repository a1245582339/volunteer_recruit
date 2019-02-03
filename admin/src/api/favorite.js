import request from '@/utils/request'
// 获取课程收藏夹
export function getCourseFavorite(params) {
  return request({
    url: '/courseFavorite',
    method: 'get',
    params
  })
}
// 获取资讯收藏夹
export function getNewsFavorite(params) {
  return request({
    url: '/newsFavorite',
    method: 'get',
    params
  })
}
