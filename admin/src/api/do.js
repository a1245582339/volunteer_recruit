import request from '@/utils/request'
// 修改课程
export function updateCourse(data) {
  return request({
    url: '/updateCourse',
    method: 'post',
    data
  })
}
// 修改课程类型
export function updateCourseClass(data) {
  return request({
    url: '/updateCourseClass',
    method: 'post',
    data
  })
}
// 删除课程
export function delCourse(data) {
  return request({
    url: '/delCourse',
    method: 'post',
    data: { data }
  })
}
// 删除课程类型
export function delCourseClass(data) {
  return request({
    url: '/delCourseClass',
    method: 'post',
    data: { data }
  })
}
// 修改轮播图
export function updateBanner(data) {
  return request({
    url: '/updateBanner',
    method: 'post',
    data: data
  })
}

