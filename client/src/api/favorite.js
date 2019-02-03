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
// 根据id获取课程收藏夹
export function getCourseFavoriteById(params) {
  return request({
    url: '/getCourseFavoriteById',
    method: 'get',
    params
  })
}
// 根据id获取资讯收藏夹
export function getNewsFavoriteById(params) {
  return request({
    url: '/getNewsFavoriteById',
    method: 'get',
    params
  })
}
// 删除课程收藏夹记录
export function delCourseFav(data) {
  return request({
    url: '/delCourseFav',
    method: 'post',
    data
  })
}
// 删除资讯收藏夹记录
export function delNewsFav(data) {
  return request({
    url: '/delNewsFav',
    method: 'post',
    data
  })
}

// 检查课程是否被收藏，并返回被收藏量
export function checkCourseFav(params) {
  return request({
    url: '/checkCourseFav',
    method: 'get',
    params
  })
}

// 课程添加收藏
export function addCourseFav(data) {
  return request({
    url: '/addCourseFav',
    method: 'post',
    data
  })
}

// 课程取消收藏
export function cancelCourseFav(data) {
  return request({
    url: '/cancelCourseFav',
    method: 'post',
    data
  })
}


// 检查资讯是否被收藏，并返回被收藏量
export function checkNewsFav(params) {
  return request({
    url: '/checkNewsFav',
    method: 'get',
    params
  })
}

// 资讯添加收藏
export function addNewsFav(data) {
  return request({
    url: '/addNewsFav',
    method: 'post',
    data
  })
}

// 资讯取消收藏
export function cancelNewsFav(data) {
  return request({
    url: '/cancelNewsFav',
    method: 'post',
    data
  })
}
